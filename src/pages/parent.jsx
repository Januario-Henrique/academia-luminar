import { useState } from "react";
import { useApp, uid } from "../store";
import { useT } from "../i18n";
import { PLANS, DAYS, TIMES } from "../data";

const Empty = () => { const { t } = useT(); return <p className="muted">{t("empty")}</p>; };
export const Badge = ({ s, p = "st" }) => { const { t } = useT(); return <span className={"badge " + s}>{t(`${p}.${s}`)}</span>; };

export function Children() {
  const { db, setDb, user } = useApp();
  const { t } = useT();
  const [f, setF] = useState({ name: "", age: "", year: "" });
  const mine = db.children.filter((c) => c.parentId === user.id);
  const add = (e) => {
    e.preventDefault();
    setDb((d) => ({ ...d, children: [...d.children, { ...f, name: f.name.trim(), id: uid(), parentId: user.id }] }));
    setF({ name: "", age: "", year: "" });
  };
  return (
    <>
      <h1>{t("m.children")}</h1>
      <form className="row" onSubmit={add}>
        <input placeholder={t("name")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
        <input type="number" min="3" max="19" placeholder={t("child.age")} value={f.age} onChange={(e) => setF({ ...f, age: e.target.value })} required />
        <input placeholder={t("child.year")} value={f.year} onChange={(e) => setF({ ...f, year: e.target.value })} required />
        <button className="btn navy">{t("child.add")}</button>
      </form>
      {mine.length === 0 ? <Empty /> : (
        <table><tbody>{mine.map((c) => <tr key={c.id}><td><b>{c.name}</b></td><td>{c.age}</td><td>{t("child.year")}: {c.year}</td></tr>)}</tbody></table>
      )}
    </>
  );
}

export function Enroll() {
  const { db, setDb, user, find } = useApp();
  const { t, kz } = useT();
  const kids = db.children.filter((c) => c.parentId === user.id);
  const [f, setF] = useState({ childId: kids[0]?.id || "", planId: "primary", subjects: [], days: [], time: TIMES[0], address: "" });
  const [err, setErr] = useState("");
  const plan = PLANS.find((p) => p.id === f.planId);
  const toggle = (k, v) => setF({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] });
  const mine = db.requests.filter((r) => r.parentId === user.id);

  const submit = (e) => {
    e.preventDefault();
    if (plan.minSubjects && f.subjects.length < plan.minSubjects) return setErr("err.subjects");
    if (f.days.length !== 3) return setErr("err.days");
    if (mine.some((r) => r.childId === f.childId && r.planId === f.planId)) return setErr("err.dup");
    setErr("");
    const subjects = plan.minSubjects ? f.subjects : [];
    setDb((d) => ({ ...d, requests: [...d.requests, { ...f, subjects, id: uid(), parentId: user.id, status: "pending", tutorId: null, createdAt: new Date().toISOString() }] }));
    setF({ ...f, subjects: [], days: [] });
  };

  return (
    <>
      <h1>{t("enroll.title")}</h1>
      {kids.length === 0 ? <p className="err">{t("enroll.noChild")}</p> : (
        <form className="stack" onSubmit={submit}>
          {err && <p className="err">{t(err)}</p>}
          <label>{t("enroll.child")}<select value={f.childId} onChange={(e) => setF({ ...f, childId: e.target.value })}>{kids.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>{t("enroll.plan")}<select value={f.planId} onChange={(e) => setF({ ...f, planId: e.target.value, subjects: [] })}>{PLANS.map((p) => <option key={p.id} value={p.id}>{t("plan." + p.id)} — {kz(p.monthly)}</option>)}</select></label>
          {plan.minSubjects > 0 && (
            <fieldset><legend>{t("enroll.subjects")}</legend>
              {plan.subjects.map((s) => <label key={s} className="chk"><input type="checkbox" checked={f.subjects.includes(s)} onChange={() => toggle("subjects", s)} />{t("subj." + s)}</label>)}
            </fieldset>
          )}
          <fieldset><legend>{t("enroll.days")}</legend>
            {DAYS.map((d) => <label key={d} className="chk"><input type="checkbox" checked={f.days.includes(d)} onChange={() => toggle("days", d)} />{t("day." + d)}</label>)}
          </fieldset>
          <label>{t("enroll.time")}<select value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>{TIMES.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>{t("enroll.address")}<input value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} required /></label>
          <button className="btn navy">{t("enroll.send")}</button>
        </form>
      )}
      {mine.length > 0 && (
        <table>
          <thead><tr><th>{t("tbl.child")}</th><th>{t("tbl.plan")}</th><th>{t("tbl.schedule")}</th><th>{t("tbl.tutor")}</th><th>{t("tbl.status")}</th></tr></thead>
          <tbody>{mine.map((r) => (
            <tr key={r.id}><td>{find("children", r.childId)?.name}</td><td>{t("plan." + r.planId)}</td>
              <td>{r.days.map((d) => t("day." + d).slice(0, 3)).join(", ")} · {r.time}</td>
              <td>{find("users", r.tutorId)?.name || "—"}</td><td><Badge s={r.status} /></td></tr>
          ))}</tbody>
        </table>
      )}
    </>
  );
}

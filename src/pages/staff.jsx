import { useState } from "react";
import { useApp, uid } from "../store";
import { useT } from "../i18n";
import { PLANS } from "../data";
import { Badge } from "./parent";

const slot = (r, t) => r.days.map((d) => t("day." + d).slice(0, 3)).join(", ") + " · " + r.time;

function RequestRow({ r }) {
  const { db, setDb, find } = useApp();
  const { t } = useT();
  const [tutor, setTutor] = useState("");
  const tutors = db.users.filter((u) => u.role === "tutor");

  const approve = () => {
    const plan = PLANS.find((p) => p.id === r.planId);
    const base = { requestId: r.id, parentId: r.parentId, status: "due", ref: "" };
    setDb((d) => ({
      ...d,
      requests: d.requests.map((x) => (x.id === r.id ? { ...x, status: "approved", tutorId: tutor } : x)),
      payments: [...d.payments,
        { ...base, id: uid(), type: "enrollment", amount: plan.enrollment },
        { ...base, id: uid(), type: "monthly", amount: plan.monthly, month: new Date().toISOString().slice(0, 7) }],
    }));
  };

  return (
    <tr>
      <td><b>{find("children", r.childId)?.name}</b><br /><small className="muted">{find("users", r.parentId)?.name}</small></td>
      <td>{t("plan." + r.planId)}<br /><small className="muted">{r.subjects.map((s) => t("subj." + s)).join(", ")}</small></td>
      <td>{slot(r, t)}<br /><small className="muted">{r.address}</small></td>
      <td>
        {r.status === "pending" ? (
          <span className="row">
            <select value={tutor} onChange={(e) => setTutor(e.target.value)}>
              <option value="">{t("pickTutor")}</option>{tutors.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <button className="btn green sm" disabled={!tutor} onClick={approve}>{t("approve")}</button>
          </span>
        ) : <><Badge s={r.status} /> <small>{find("users", r.tutorId)?.name}</small></>}
      </td>
    </tr>
  );
}

export function Requests() {
  const { db } = useApp();
  const { t } = useT();
  return (
    <>
      <h1>{t("m.requests")}</h1>
      {db.requests.length === 0 ? <p className="muted">{t("empty")}</p> : (
        <table>
          <thead><tr><th>{t("tbl.child")}</th><th>{t("tbl.plan")}</th><th>{t("tbl.schedule")}</th><th>{t("tbl.status")}</th></tr></thead>
          <tbody>{[...db.requests].reverse().map((r) => <RequestRow key={r.id} r={r} />)}</tbody>
        </table>
      )}
    </>
  );
}

const useMyStudents = () => {
  const { db, user } = useApp();
  return db.requests.filter((r) => r.tutorId === user.id && r.status === "active");
};

export function Students() {
  const { find } = useApp();
  const { t } = useT();
  const list = useMyStudents();
  return (
    <>
      <h1>{t("m.students")}</h1>
      {list.length === 0 ? <p className="muted">{t("empty")}</p> : (
        <table>
          <thead><tr><th>{t("tbl.child")}</th><th>{t("tbl.plan")}</th><th>{t("tbl.schedule")}</th><th>{t("tbl.address")}</th></tr></thead>
          <tbody>{list.map((r) => <tr key={r.id}><td>{find("children", r.childId)?.name}</td><td>{t("plan." + r.planId)}</td><td>{slot(r, t)}</td><td>{r.address}</td></tr>)}</tbody>
        </table>
      )}
    </>
  );
}

export function Sessions() {
  const { db, setDb, user, find } = useApp();
  const { t } = useT();
  const students = useMyStudents();
  const [f, setF] = useState({ requestId: "", date: new Date().toISOString().slice(0, 10), note: "" });
  const mine = db.sessions.filter((s) => s.tutorId === user.id);
  const add = (e) => {
    e.preventDefault();
    setDb((d) => ({ ...d, sessions: [{ ...f, id: uid(), tutorId: user.id }, ...d.sessions] }));
    setF({ ...f, note: "" });
  };
  const name = (reqId) => find("children", find("requests", reqId)?.childId)?.name;
  return (
    <>
      <h1>{t("m.sessions")}</h1>
      <form className="stack" onSubmit={add}>
        <label>{t("ses.student")}<select value={f.requestId} onChange={(e) => setF({ ...f, requestId: e.target.value })} required>
          <option value="" />{students.map((r) => <option key={r.id} value={r.id}>{name(r.id)}</option>)}</select></label>
        <label>{t("tbl.date")}<input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} required /></label>
        <label>{t("ses.note")}<textarea value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} required /></label>
        <button className="btn navy">{t("ses.add")}</button>
      </form>
      {mine.length > 0 && (
        <table>
          <thead><tr><th>{t("tbl.date")}</th><th>{t("ses.student")}</th><th>{t("tbl.note")}</th></tr></thead>
          <tbody>{mine.map((s) => <tr key={s.id}><td>{s.date}</td><td>{name(s.requestId)}</td><td>{s.note}</td></tr>)}</tbody>
        </table>
      )}
    </>
  );
}

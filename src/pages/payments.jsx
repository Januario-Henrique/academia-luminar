import { useState } from "react";
import { useApp } from "../store";
import { useT } from "../i18n";
import { Badge } from "./parent";

function Row({ p }) {
  const { user, setDb, find } = useApp();
  const { t, kz } = useT();
  const [ref, setRef] = useState("");
  const req = find("requests", p.requestId);
  const setStatus = (status, extra = {}) =>
    setDb((d) => {
      const payments = d.payments.map((x) => (x.id === p.id ? { ...x, status, ...extra } : x));
      // Confirmed enrollment fee activates the request
      const requests = status === "paid" && p.type === "enrollment"
        ? d.requests.map((r) => (r.id === p.requestId ? { ...r, status: "active" } : r)) : d.requests;
      return { ...d, payments, requests };
    });
  return (
    <tr>
      <td>{find("children", req?.childId)?.name}</td>
      {user.role === "admin" && <td>{find("users", p.parentId)?.name}</td>}
      <td>{t("pay.type." + p.type)}{p.month ? ` (${p.month})` : ""}</td><td>{kz(p.amount)}</td>
      <td><Badge s={p.status} p="pay" />{p.ref && <small className="muted"> #{p.ref}</small>}</td>
      <td>
        {user.role === "parent" && p.status === "due" && (
          <span className="row">
            <input placeholder={t("pay.ref")} value={ref} onChange={(e) => setRef(e.target.value)} />
            <button className="btn navy sm" disabled={!ref.trim()} onClick={() => setStatus("submitted", { ref: ref.trim() })}>{t("pay.send")}</button>
          </span>
        )}
        {user.role === "admin" && p.status !== "paid" && <button className="btn green sm" onClick={() => setStatus("paid")}>{t("pay.confirm")}</button>}
      </td>
    </tr>
  );
}

export default function Payments() {
  const { db, user } = useApp();
  const { t } = useT();
  const list = db.payments.filter((p) => user.role === "admin" || p.parentId === user.id);
  return (
    <>
      <h1>{t("m.payments")}</h1>
      {list.length === 0 ? <p className="muted">{t("empty")}</p> : (
        <table>
          <thead><tr><th>{t("tbl.child")}</th>{user.role === "admin" && <th>{t("tbl.parent")}</th>}<th>{t("tbl.type")}</th><th>{t("tbl.amount")}</th><th>{t("tbl.status")}</th><th /></tr></thead>
          <tbody>{list.map((p) => <Row key={p.id} p={p} />)}</tbody>
        </table>
      )}
    </>
  );
}

import { useApp } from "../store";
import { useT } from "../i18n";
import { PLANS } from "../data";

export default function Overview() {
  const { db, user } = useApp();
  const { t, kz } = useT();
  const mine = db.requests.filter((r) => (user.role === "tutor" ? r.tutorId === user.id : user.role === "parent" ? r.parentId === user.id : true));
  const due = db.payments.filter((p) => p.parentId === user.id && p.status !== "paid").reduce((s, p) => s + p.amount, 0);
  const stats = {
    parent: [["stat.children", db.children.filter((c) => c.parentId === user.id).length], ["stat.requests", mine.length], ["stat.due", kz(due)]],
    tutor: [["stat.tutors", mine.filter((r) => r.status === "active").length], ["stat.sessions", db.sessions.filter((s) => s.tutorId === user.id).length]],
    admin: [["stat.pending", mine.filter((r) => r.status === "pending").length], ["stat.active", mine.filter((r) => r.status === "active").length], ["stat.requests", mine.length]],
  }[user.role];
  void PLANS;
  return (
    <>
      <h1>{t("hello")}, {user.name}</h1>
      <div className="stats">
        {stats.map(([k, v]) => <div key={k} className="stat"><strong>{v}</strong><span>{t(k)}</span></div>)}
      </div>
    </>
  );
}

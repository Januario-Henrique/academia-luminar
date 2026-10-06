import { useApp } from "../store";

function NoticeList({ limit }) {
  const { db } = useApp();
  const items = limit ? db.notices.slice(0, limit) : db.notices;
  return <ul>{items.map((n) => <li key={n.id}>📢 {n.text} <small className="muted">({n.date})</small></li>)}</ul>;
}

export function Overview() {
  const { db, user } = useApp();
  let banner, cards;

  if (user.role === "student") {
    const due = user.enrollments.filter((e) => !e.paid).reduce((s, e) => s + db.courses.find((c) => c.id === e.courseId).fee, 0);
    banner = ["Welcome back, " + user.name + "!", "Always stay updated in your student portal", "🎓"];
    cards = [["Enrolled Courses", user.enrollments.length], ["Internship Applications", user.applications.length], ["Amount Due", "$" + due]];
  } else {
    const mine = db.internships.filter((i) => i.employerEmail === user.email);
    const apps = db.students.flatMap((s) => s.applications).filter((a) => mine.some((i) => i.id === a.internshipId));
    banner = ["Welcome, " + user.name + "!", user.companyName + " Portal", "🏢"];
    cards = [["Active Postings", mine.length], ["Total Candidates", apps.length], ["Pending Review", apps.filter((a) => a.status === "Pending").length]];
  }

  return (
    <>
      <div className="welcome-banner">
        <div><h2>{banner[0]}</h2><p>{banner[1]}</p></div>
        <div>{banner[2]}</div>
      </div>
      <div className="cards-grid">
        {cards.map(([label, value]) => (
          <div className="card" key={label}><h3>{label}</h3><p style={{ fontSize: "2rem", margin: 0 }}>{value}</p></div>
        ))}
      </div>
      <div className="card"><h3>Latest Notices</h3><NoticeList limit={3} /></div>
    </>
  );
}

export function Notices() {
  return (
    <>
      <h2 className="page-title">Notices</h2>
      <div className="card"><NoticeList /></div>
    </>
  );
}

import { useState } from "react";
import { useApp } from "../store";

export function Postings() {
  const { db, setDb, user } = useApp();
  const [form, setForm] = useState({ title: "", stipend: "" });
  const mine = db.internships.filter((i) => i.employerEmail === user.email);
  const count = (id) => db.students.filter((s) => s.applications.some((a) => a.internshipId === id)).length;

  const add = (e) => {
    e.preventDefault();
    const post = { id: Date.now(), title: form.title.trim(), stipend: form.stipend.trim(), company: user.companyName, employerEmail: user.email };
    setDb((d) => ({ ...d, internships: [...d.internships, post] }));
    setForm({ title: "", stipend: "" });
  };
  const remove = (id) => setDb((d) => ({ ...d, internships: d.internships.filter((i) => i.id !== id) }));

  return (
    <>
      <h2 className="page-title">Internship Postings</h2>
      <div className="card">
        <h3>New posting</h3>
        <form className="inline-form" onSubmit={add}>
          <input placeholder="Position title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Stipend (e.g. $500/mo)" value={form.stipend} onChange={(e) => setForm({ ...form, stipend: e.target.value })} required />
          <button type="submit">Publish</button>
        </form>
      </div>
      <div className="card">
        {mine.length === 0 ? <p className="muted">You have no postings yet.</p> : (
          <table className="table">
            <thead><tr><th>Position</th><th>Stipend</th><th>Applicants</th><th></th></tr></thead>
            <tbody>
              {mine.map((i) => (
                <tr key={i.id}>
                  <td>{i.title}</td><td>{i.stipend}</td><td>{count(i.id)}</td>
                  <td><button className="btn-sm btn-danger" onClick={() => remove(i.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export function Candidates() {
  const { db, setDb, user } = useApp();
  const mine = db.internships.filter((i) => i.employerEmail === user.email);
  const rows = db.students.flatMap((s) =>
    s.applications
      .map((a) => ({ student: s, app: a, job: mine.find((i) => i.id === a.internshipId) }))
      .filter((r) => r.job)
  );

  const review = (email, internshipId, status) =>
    setDb((d) => ({
      ...d,
      students: d.students.map((s) => s.email !== email ? s : {
        ...s,
        applications: s.applications.map((a) => (a.internshipId === internshipId ? { ...a, status } : a)),
      }),
    }));

  return (
    <>
      <h2 className="page-title">Candidates</h2>
      <div className="card">
        {rows.length === 0 ? <p className="muted">No applications yet.</p> : (
          <table className="table">
            <thead><tr><th>Candidate</th><th>Position</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map(({ student: s, app, job }) => (
                <tr key={s.email + job.id}>
                  <td>{s.name}<br /><small className="muted">{s.email}</small></td>
                  <td>{job.title}</td>
                  <td><span className={"badge " + app.status.toLowerCase()}>{app.status}</span></td>
                  <td>
                    <button className="btn-sm btn-ok" onClick={() => review(s.email, job.id, "Accepted")}>Accept</button>{" "}
                    <button className="btn-sm btn-danger" onClick={() => review(s.email, job.id, "Rejected")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

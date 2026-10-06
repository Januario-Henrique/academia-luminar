import { useApp } from "../store";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Enrollments joined with their course data
function useEnrollments() {
  const { db, user } = useApp();
  return user.enrollments.map((e) => ({ ...e, course: db.courses.find((c) => c.id === e.courseId) }));
}

const Empty = ({ text }) => <p className="muted">{text}</p>;

export function Registration() {
  const { db, user, updateUser } = useApp();
  const enroll = (id) => updateUser((u) => ({ ...u, enrollments: [...u.enrollments, { courseId: id, paid: false, grade: null }] }));
  return (
    <>
      <h2 className="page-title">Course Registration</h2>
      <div className="card">
        <table className="table">
          <thead><tr><th>Course</th><th>Instructor</th><th>Schedule</th><th>Fee</th><th></th></tr></thead>
          <tbody>
            {db.courses.map((c) => {
              const done = user.enrollments.some((e) => e.courseId === c.id);
              return (
                <tr key={c.id}>
                  <td>{c.title}</td><td>{c.instructor}</td><td>{c.day}, {c.time}</td><td>${c.fee}</td>
                  <td><button className="btn-sm" disabled={done} onClick={() => enroll(c.id)}>{done ? "Enrolled" : "Enroll"}</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function MyCourses() {
  const list = useEnrollments();
  return (
    <>
      <h2 className="page-title">My Courses</h2>
      {list.length === 0 && <Empty text="You are not enrolled in any course yet. Go to Registration to enroll." />}
      <div className="cards-grid">
        {list.map(({ course: c }) => (
          <div className="card" key={c.id}><h3>📖 {c.title}</h3><p>Instructor: {c.instructor}</p><p>{c.day}, {c.time}</p></div>
        ))}
      </div>
    </>
  );
}

export function Payments() {
  const { updateUser } = useApp();
  const list = useEnrollments();
  const due = list.filter((e) => !e.paid).reduce((s, e) => s + e.course.fee, 0);
  const pay = (id) => updateUser((u) => ({ ...u, enrollments: u.enrollments.map((e) => (e.courseId === id ? { ...e, paid: true } : e)) }));
  return (
    <>
      <h2 className="page-title">Payment Info</h2>
      <div className="card">
        <p><strong>Total due: ${due}</strong></p>
        {list.length === 0 ? <Empty text="No fees yet. Enroll in a course first." /> : (
          <table className="table">
            <thead><tr><th>Course</th><th>Fee</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.courseId}>
                  <td>{e.course.title}</td><td>${e.course.fee}</td>
                  <td><span className={"badge " + (e.paid ? "paid" : "unpaid")}>{e.paid ? "Paid" : "Unpaid"}</span></td>
                  <td>{!e.paid && <button className="btn-sm btn-ok" onClick={() => pay(e.courseId)}>Pay now</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export function DropSemester() {
  const { updateUser } = useApp();
  const list = useEnrollments();
  const drop = (e) => {
    if (!window.confirm(`Drop "${e.course.title}"?`)) return;
    updateUser((u) => ({ ...u, enrollments: u.enrollments.filter((x) => x.courseId !== e.courseId) }));
  };
  return (
    <>
      <h2 className="page-title">Drop Semester</h2>
      <div className="card">
        {list.length === 0 ? <Empty text="You have no courses to drop." /> : (
          <table className="table">
            <tbody>
              {list.map((e) => (
                <tr key={e.courseId}>
                  <td>{e.course.title}</td>
                  <td><button className="btn-sm btn-danger" onClick={() => drop(e)}>Drop course</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export function Results() {
  const list = useEnrollments();
  return (
    <>
      <h2 className="page-title">Results</h2>
      <div className="card">
        {list.length === 0 ? <Empty text="No results yet." /> : (
          <table className="table">
            <thead><tr><th>Course</th><th>Grade</th></tr></thead>
            <tbody>{list.map((e) => <tr key={e.courseId}><td>{e.course.title}</td><td>{e.grade || <span className="muted">Not graded yet</span>}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </>
  );
}

export function Schedule() {
  const list = useEnrollments().sort((a, b) => DAYS.indexOf(a.course.day) - DAYS.indexOf(b.course.day));
  return (
    <>
      <h2 className="page-title">Weekly Schedule</h2>
      <div className="card">
        {list.length === 0 ? <Empty text="Your schedule is empty. Enroll in a course to see it here." /> : (
          <table className="table">
            <thead><tr><th>Day</th><th>Time</th><th>Course</th></tr></thead>
            <tbody>{list.map((e) => <tr key={e.courseId}><td>{e.course.day}</td><td>{e.course.time}</td><td>{e.course.title}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </>
  );
}

export function Internships() {
  const { db, user, updateUser } = useApp();
  const apply = (id) => updateUser((u) => ({ ...u, applications: [...u.applications, { internshipId: id, status: "Pending" }] }));
  return (
    <>
      <h2 className="page-title">Internships</h2>
      <div className="card">
        {db.internships.length === 0 ? <Empty text="No internships available right now." /> : (
          <table className="table">
            <thead><tr><th>Position</th><th>Company</th><th>Stipend</th><th>Status</th></tr></thead>
            <tbody>
              {db.internships.map((i) => {
                const app = user.applications.find((a) => a.internshipId === i.id);
                return (
                  <tr key={i.id}>
                    <td>{i.title}</td><td>{i.company}</td><td>{i.stipend}</td>
                    <td>{app
                      ? <span className={"badge " + app.status.toLowerCase()}>{app.status}</span>
                      : <button className="btn-sm" onClick={() => apply(i.id)}>Apply</button>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

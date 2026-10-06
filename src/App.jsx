import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout, Only, PublicLayout } from "./layouts";
import { About, Home } from "./pages/Public";
import { Login, Register } from "./pages/Auth";
import { Notices, Overview } from "./pages/Dashboard";
import { DropSemester, Internships, MyCourses, Payments, Registration, Results, Schedule } from "./pages/student";
import { Candidates, Postings } from "./pages/employer";

const student = (el) => <Only role="student">{el}</Only>;
const employer = (el) => <Only role="employer">{el}</Only>;

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register/:role" element={<Register />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="notices" element={<Notices />} />
        {/* student only */}
        <Route path="payments" element={student(<Payments />)} />
        <Route path="registration" element={student(<Registration />)} />
        <Route path="courses" element={student(<MyCourses />)} />
        <Route path="internships" element={student(<Internships />)} />
        <Route path="drop-semester" element={student(<DropSemester />)} />
        <Route path="results" element={student(<Results />)} />
        <Route path="schedule" element={student(<Schedule />)} />
        {/* employer only */}
        <Route path="postings" element={employer(<Postings />)} />
        <Route path="candidates" element={employer(<Candidates />)} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

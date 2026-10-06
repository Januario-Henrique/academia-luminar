import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, Only, PublicLayout } from "./layouts";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import Overview from "./pages/Overview";
import { Children, Enroll } from "./pages/parent";
import Payments from "./pages/payments";
import { Requests, Sessions, Students, Tutors } from "./pages/staff";

const only = (roles, el) => <Only roles={roles}>{el}</Only>;

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="children" element={only(["parent"], <Children />)} />
        <Route path="enroll" element={only(["parent"], <Enroll />)} />
        <Route path="payments" element={only(["parent", "admin"], <Payments />)} />
        <Route path="requests" element={only(["admin"], <Requests />)} />
        <Route path="tutors" element={only(["admin"], <Tutors />)} />
        <Route path="students" element={only(["tutor"], <Students />)} />
        <Route path="sessions" element={only(["tutor"], <Sessions />)} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { seed } from "./data";

const AppContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [db, setDb] = useLocalStorage("luminar_db", seed);
  const [session, setSession] = useLocalStorage("luminar_session", null);

  const same = (a, b) => a.toLowerCase() === b.toLowerCase();
  const user = session ? db[session.role + "s"].find((u) => u.email === session.email) || null : null;

  const login = (email, password, role) => {
    const found = db[role + "s"].find((u) => same(u.email, email) && u.password === password);
    if (found) setSession({ email: found.email, role });
    return Boolean(found);
  };
  const logout = () => setSession(null);

  const register = (role, form) => {
    const key = role + "s";
    if (db[key].some((u) => same(u.email, form.email))) {
      return { ok: false, message: "This email is already registered." };
    }
    const account = role === "student" ? { ...form, role, enrollments: [], applications: [] } : { ...form, role };
    setDb((d) => ({ ...d, [key]: [...d[key], account] }));
    return { ok: true, message: "Registration complete! Redirecting to login..." };
  };

  // Update the logged-in user: updateUser(u => ({ ...u, ... }))
  const updateUser = (fn) =>
    setDb((d) => {
      const key = session.role + "s";
      return { ...d, [key]: d[key].map((u) => (u.email === session.email ? fn(u) : u)) };
    });

  return (
    <AppContext.Provider value={{ db, setDb, user, login, logout, register, updateUser }}>
      {children}
    </AppContext.Provider>
  );
}

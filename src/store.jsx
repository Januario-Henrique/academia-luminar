import { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { seed } from "./data";

const Ctx = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(Ctx);
// eslint-disable-next-line react-refresh/only-export-components
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function AppProvider({ children }) {
  const [db, setDb] = useLocalStorage("luminar_db_v2", seed);
  const [sessionId, setSessionId] = useLocalStorage("luminar_session_v2", null);
  const user = db.users.find((u) => u.id === sessionId) || null;

  const login = (email, password) => {
    const u = db.users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (u) setSessionId(u.id);
    return Boolean(u);
  };
  const logout = () => setSessionId(null);
  const register = (form) => {
    if (db.users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) return false;
    setDb((d) => ({ ...d, users: [...d.users, { ...form, id: uid(), role: "parent" }] }));
    return true;
  };

  // Helpers to join related records
  const find = (list, id) => db[list].find((x) => x.id === id);
  return <Ctx.Provider value={{ db, setDb, user, login, logout, register, find }}>{children}</Ctx.Provider>;
}

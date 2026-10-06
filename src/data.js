export const WHATSAPP = "244926396818";
export const WHATSAPP_LABEL = "926 39 68 18";
export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat"];
export const TIMES = ["14:00", "15:30", "17:00"];

// Plans come from the flyers. minSubjects: 0 = all subjects included.
export const PLANS = [
  { id: "primary", monthly: 40000, enrollment: 5000, subjects: [], minSubjects: 0, color: "green" },
  { id: "secondary", monthly: 50000, enrollment: 5000, subjects: ["math", "physics", "chemistry", "portuguese", "english"], minSubjects: 3, color: "navy" },
  { id: "english", monthly: 45000, enrollment: 5000, subjects: [], minSubjects: 0, color: "gold" },
];

export const seed = {
  users: [
    { id: "u1", role: "admin", name: "Luminar Admin", email: "admin@luminar.ao", password: "admin123", phone: "" },
    { id: "u2", role: "tutor", name: "Ana Costa", email: "tutor@luminar.ao", password: "tutor123", phone: "", plans: ["primary", "secondary", "english"], active: true },
    { id: "u3", role: "parent", name: "Maria Silva", email: "parent@luminar.ao", password: "parent123", phone: "923000000" },
  ],
  children: [{ id: "c1", parentId: "u3", name: "Pedro Silva", age: 9, year: "4" }],
  requests: [],
  payments: [],
  sessions: [],
};

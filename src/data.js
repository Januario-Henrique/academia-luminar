// Initial data. On first load it is copied to localStorage and from then on the app reads/writes there.
export const seed = {
  courses: [
    { id: 1, title: "Full-Stack Web Development", instructor: "Dr. Maria Santos", fee: 350, day: "Monday", time: "09:00 - 11:00" },
    { id: 2, title: "UI/UX Figma Masterclass", instructor: "Paulo Mendes", fee: 220, day: "Wednesday", time: "14:00 - 16:00" },
    { id: 3, title: "Python for Data Science", instructor: "Dr. Ana Costa", fee: 300, day: "Tuesday", time: "10:00 - 12:00" },
    { id: 4, title: "Digital Marketing Essentials", instructor: "Carlos Silva", fee: 180, day: "Friday", time: "13:00 - 15:00" },
  ],
  internships: [
    { id: 1, title: "Frontend React Intern", company: "PixelCraft", stipend: "$500/mo", employerEmail: null },
    { id: 2, title: "Python Data Science Intern", company: "DataWorks", stipend: "$600/mo", employerEmail: null },
    { id: 3, title: "Junior Backend Developer", company: "InnoTech Solutions", stipend: "$550/mo", employerEmail: "employer@example.com" },
  ],
  notices: [
    { id: 1, date: "2026-10-01", text: "Course registration is open for the next term." },
    { id: 2, date: "2026-09-28", text: "New UI/UX workshop modules are now available." },
    { id: 3, date: "2026-09-20", text: "Payment deadline for this term is October 31." },
  ],
  students: [
    {
      email: "student@example.com", password: "password123", name: "Alex Johnson", role: "student",
      enrollments: [{ courseId: 1, paid: true, grade: "A" }, { courseId: 2, paid: false, grade: null }],
      applications: [{ internshipId: 3, status: "Pending" }],
    },
  ],
  employers: [
    { email: "employer@example.com", password: "password123", name: "Sarah Connor", companyName: "InnoTech Solutions", role: "employer" },
  ],
};

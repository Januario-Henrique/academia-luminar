import { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

// key: [Portuguese, English]
const D = {
  "brand.tag": ["Ao domicílio em Luanda", "Home tutoring in Luanda"],
  "nav.home": ["Início", "Home"], "nav.login": ["Entrar", "Login"], "nav.register": ["Criar conta", "Sign up"],
  "hero.title": ["Reforço escolar ao domicílio", "School tutoring at home"],
  "hero.sub": ["Aprender hoje, construir um futuro brilhante!", "Learn today, build a bright future!"],
  "hero.cta": ["Inscrever o meu filho", "Enroll my child"],
  "wa": ["Fale connosco pelo WhatsApp", "Chat with us on WhatsApp"],
  "plans.title": ["Os nossos planos", "Our plans"],
  "plan.primary": ["Ensino Primário", "Primary School"], "plan.secondary": ["Ensino Secundário", "Secondary School"], "plan.english": ["Aulas de Inglês", "English Classes"],
  "plan.primary.d": ["Todas as disciplinas, com apoio completo ao desenvolvimento do seu filho.", "All subjects, with full support for your child's development."],
  "plan.secondary.d": ["A partir de 3 disciplinas, para o 1º e 2º ciclos. Foco, método e resultados.", "From 3 subjects, for lower and upper secondary. Focus, method, results."],
  "plan.english.d": ["Conversação, leitura, gramática e pronúncia para crianças e adolescentes.", "Conversation, reading, grammar and pronunciation for kids and teens."],
  "monthly": ["Mensalidade", "Monthly fee"], "enrollment": ["Inscrição", "Enrollment fee"],
  "why.title": ["Porquê a Academia Luminar?", "Why Academia Luminar?"],
  "why.1": ["Professores qualificados", "Qualified teachers"], "why.2": ["Métodos eficazes", "Effective methods"],
  "why.3": ["Acompanhamento individualizado", "Individual follow-up"], "why.4": ["Melhor desempenho e resultados", "Better performance and results"],
  "why.5": ["Ambiente seguro, acolhedor e confiável", "Safe, welcoming, trusted environment"],
  "how.1": ["Aulas ao domicílio em Luanda", "Lessons at home in Luanda"], "how.2": ["3 vezes por semana", "3 times a week"], "how.3": ["1h30 por aula", "1h30 per lesson"],
  "cta.band": ["Invista hoje no futuro do seu filho!", "Invest in your child's future today!"],
  "subj.math": ["Matemática", "Mathematics"], "subj.physics": ["Física", "Physics"], "subj.chemistry": ["Química", "Chemistry"],
  "subj.portuguese": ["Português", "Portuguese"], "subj.english": ["Inglês", "English"],
  "day.mon": ["Segunda", "Monday"], "day.tue": ["Terça", "Tuesday"], "day.wed": ["Quarta", "Wednesday"],
  "day.thu": ["Quinta", "Thursday"], "day.fri": ["Sexta", "Friday"], "day.sat": ["Sábado", "Saturday"],
  "email": ["Email", "Email"], "password": ["Palavra-passe", "Password"], "name": ["Nome completo", "Full name"], "phone": ["Telefone", "Phone"],
  "login.title": ["Entrar na sua conta", "Log in to your account"], "login.err": ["Email ou palavra-passe incorretos.", "Incorrect email or password."],
  "login.demo": ["Contas de teste: parent@luminar.ao / parent123 · tutor@luminar.ao / tutor123 · admin@luminar.ao / admin123", "Test accounts: parent@luminar.ao / parent123 · tutor@luminar.ao / tutor123 · admin@luminar.ao / admin123"],
  "reg.title": ["Conta de encarregado de educação", "Parent / guardian account"],
  "reg.exists": ["Este email já está registado.", "This email is already registered."],
  "reg.ok": ["Conta criada! A redirecionar...", "Account created! Redirecting..."],
  "m.dashboard": ["Painel", "Dashboard"], "m.children": ["Os meus filhos", "My children"], "m.enroll": ["Inscrever / Pedidos", "Enroll / Requests"],
  "m.payments": ["Pagamentos", "Payments"], "m.requests": ["Pedidos", "Requests"], "m.students": ["Os meus alunos", "My students"],
  "m.sessions": ["Registo de aulas", "Session log"], "logout": ["Sair", "Log out"],
  "hello": ["Olá", "Hello"],
  "stat.children": ["Filhos", "Children"], "stat.requests": ["Pedidos", "Requests"], "stat.active": ["Ativos", "Active"],
  "stat.due": ["Por pagar", "Amount due"], "stat.pending": ["Por aprovar", "To approve"], "stat.tutors": ["Alunos", "Students"], "stat.sessions": ["Aulas dadas", "Lessons given"],
  "child.add": ["Adicionar filho", "Add child"], "child.age": ["Idade", "Age"], "child.year": ["Ano escolar", "School year"],
  "enroll.title": ["Novo pedido de inscrição", "New enrollment request"], "enroll.child": ["Filho", "Child"], "enroll.plan": ["Plano", "Plan"],
  "enroll.subjects": ["Disciplinas (mínimo 3)", "Subjects (at least 3)"], "enroll.days": ["Escolha 3 dias por semana", "Choose 3 days a week"],
  "enroll.time": ["Hora de início (aula de 1h30)", "Start time (1h30 lesson)"], "enroll.address": ["Morada em Luanda", "Address in Luanda"],
  "enroll.send": ["Enviar pedido", "Send request"], "enroll.noChild": ["Adicione primeiro um filho.", "Add a child first."],
  "err.subjects": ["Escolha pelo menos 3 disciplinas.", "Choose at least 3 subjects."], "err.days": ["Escolha exatamente 3 dias.", "Choose exactly 3 days."],
  "err.dup": ["Este filho já tem um pedido ativo para este plano.", "This child already has an open request for this plan."],
  "st.pending": ["Pendente", "Pending"], "st.approved": ["Aprovado", "Approved"], "st.active": ["Ativo", "Active"],
  "pay.due": ["Por pagar", "Due"], "pay.submitted": ["Em verificação", "Under review"], "pay.paid": ["Pago", "Paid"],
  "pay.ref": ["Referência da transferência", "Transfer reference"], "pay.send": ["Já paguei", "I have paid"], "pay.confirm": ["Confirmar", "Confirm"],
  "pay.type.enrollment": ["Inscrição", "Enrollment"], "pay.type.monthly": ["Mensalidade", "Monthly fee"],
  "tbl.child": ["Filho", "Child"], "tbl.plan": ["Plano", "Plan"], "tbl.status": ["Estado", "Status"], "tbl.tutor": ["Professor", "Tutor"],
  "tbl.schedule": ["Horário", "Schedule"], "tbl.amount": ["Valor", "Amount"], "tbl.type": ["Tipo", "Type"], "tbl.parent": ["Encarregado", "Parent"],
  "tbl.address": ["Morada", "Address"], "tbl.date": ["Data", "Date"], "tbl.note": ["Nota", "Note"], "tbl.subjects": ["Disciplinas", "Subjects"],
  "approve": ["Aprovar", "Approve"], "pickTutor": ["Escolher professor", "Pick a tutor"], "add": ["Adicionar", "Add"],
  "empty": ["Ainda não há nada aqui.", "Nothing here yet."],
  "m.tutors": ["Professores", "Tutors"], "tutor.add": ["Criar conta de professor", "Create tutor account"],
  "tutor.temp": ["Palavra-passe provisória", "Temporary password"], "tutor.plans": ["Planos que leciona", "Plans they teach"],
  "tutor.created": ["Conta criada! Envie o email e a palavra-passe ao professor.", "Account created! Send the email and password to the tutor."],
  "tutor.activate": ["Ativar", "Activate"], "tutor.deactivate": ["Desativar", "Deactivate"],
  "login.inactive": ["Esta conta está desativada. Contacte a Academia Luminar.", "This account is deactivated. Contact Academia Luminar."],
  "err.blank": ["O nome não pode estar vazio.", "The name cannot be blank."], "err.plans": ["Escolha pelo menos um plano.", "Choose at least one plan."],
  "tbl.contact": ["Contacto", "Contact"], "tbl.plans": ["Planos", "Plans"], "st.inactive": ["Inativo", "Inactive"],
  "ses.add": ["Registar aula dada", "Log a lesson"], "ses.note": ["Resumo / desempenho do aluno", "Summary / student progress"], "ses.student": ["Aluno", "Student"],
};

const Ctx = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useT = () => useContext(Ctx);

export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage("luminar_lang", "pt");
  const t = (k) => D[k]?.[lang === "pt" ? 0 : 1] ?? k;
  const kz = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz";
  return <Ctx.Provider value={{ lang, setLang, t, kz }}>{children}</Ctx.Provider>;
}

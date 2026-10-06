import { Link } from "react-router-dom";
import { useT } from "../i18n";
import { PLANS } from "../data";
import { WhatsApp } from "../layouts";

export default function Home() {
  const { t, kz } = useT();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">{t("brand.tag")}</p>
          <h1>{t("hero.title")}</h1>
          <p className="lead">{t("hero.sub")}</p>
          <div className="actions">
            <Link className="btn gold" to="/register">{t("hero.cta")}</Link>
            <WhatsApp />
          </div>
        </div>
        <ul className="facts">
          {[1, 2, 3].map((n) => <li key={n}>{t("how." + n)}</li>)}
        </ul>
      </section>

      <section className="block">
        <h2>{t("plans.title")}</h2>
        <div className="plans">
          {PLANS.map((p) => (
            <article key={p.id} className={"plan " + p.color}>
              <h3>{t("plan." + p.id)}</h3>
              <p>{t(`plan.${p.id}.d`)}</p>
              {p.subjects.length > 0 && <p className="chips">{p.subjects.map((s) => <span key={s}>{t("subj." + s)}</span>)}</p>}
              <dl>
                <div><dt>{t("monthly")}</dt><dd>{kz(p.monthly)}</dd></div>
                <div><dt>{t("enrollment")}</dt><dd>{kz(p.enrollment)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="block alt">
        <h2>{t("why.title")}</h2>
        <ul className="why">{[1, 2, 3, 4, 5].map((n) => <li key={n}>{t("why." + n)}</li>)}</ul>
      </section>

      <section className="band">
        <h2>{t("cta.band")}</h2>
        <WhatsApp big />
      </section>
    </>
  );
}

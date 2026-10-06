export default function Logo({ light }) {
  return (
    <span className={"logo" + (light ? " light" : "")}>
      <svg viewBox="0 0 64 46" width="40" aria-hidden="true">
        <path d="M32 16C24 10 12 10 4 14v26c8-4 20-4 28 2 8-6 20-6 28-2V14C52 10 40 10 32 16z" fill="#C9971C" />
        <path d="M32 16v26" stroke="#fff" strokeWidth="2" />
        <path d="M32 0l2.4 6 6.4.4-5 4 1.6 6.2L32 13l-5.4 3.6 1.6-6.2-5-4 6.4-.4z" fill="#C9971C" />
      </svg>
      <span><b>Academia</b><b className="gold">Luminar</b></span>
    </span>
  );
}

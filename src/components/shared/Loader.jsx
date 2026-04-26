export default function Loader({ fullscreen = false }) {
  if (fullscreen) {
    return (
      <div className="loader-overlay">
        <LoaderMark />
      </div>
    );
  }
  return (
    <div className="loader-inline">
      <LoaderMark small />
    </div>
  );
}

function LoaderMark({ small }) {
  const size = small ? 36 : 56;
  const fontSize = small ? 22 : 34;
  const ring = small ? 36 : 56;
  return (
    <div className="loader-mark" style={{ width: ring, height: ring }}>
      <svg
        className="loader-ring"
        viewBox={`0 0 ${ring} ${ring}`}
        width={ring}
        height={ring}
        style={{ position: 'absolute', inset: 0 }}
      >
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={ring / 2 - 2.5}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2.5"
        />
        <circle
          className="loader-arc"
          cx={ring / 2}
          cy={ring / 2}
          r={ring / 2 - 2.5}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={Math.PI * (ring - 5)}
          strokeDashoffset={Math.PI * (ring - 5) * 0.75}
        />
      </svg>
      <span
        className="loader-letter"
        style={{ fontSize, lineHeight: `${ring}px` }}
      >
        B
      </span>
    </div>
  );
}

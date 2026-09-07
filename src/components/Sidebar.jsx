const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "flashcards", label: "Hebrew Flashcards", icon: "🔤" },
  { key: "typing", label: "Typing Practice", icon: "⌨️" },
];

export default function Sidebar({ current, onSelect }) {
  return (
    <nav style={{
      width: 220,
      flexShrink: 0,
      height: "100vh",
      background: "#14142a",
      borderRight: "1px solid #2a2a4a",
      display: "flex",
      flexDirection: "column",
      padding: "20px 12px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#7eb8f7", marginBottom: 24, paddingLeft: 8 }}>
        עברית
      </div>
      {NAV_ITEMS.map(item => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            marginBottom: 4,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontSize: 14,
            background: current === item.key ? "#7eb8f7" : "transparent",
            color: current === item.key ? "#0f0f1a" : "#aaa",
            fontWeight: current === item.key ? 700 : 400,
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

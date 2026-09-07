export default function Home() {
  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#666",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
        <p style={{ fontSize: 16, margin: 0 }}>Home — próximamente</p>
      </div>
    </div>
  );
}

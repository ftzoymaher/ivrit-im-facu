import { useState, useMemo, useRef, useEffect } from "react";
import { DEFAULT_TEXTS } from "../data/typingTexts.js";

const STORAGE_KEY = "hebrewTypingCustomTexts";

function loadCustomTexts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomTexts(texts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(texts));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently
  }
}

function btnStyle(bg, color) {
  return {
    background: bg, color, border: "none", borderRadius: 10,
    padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13,
  };
}

export default function TypingPractice() {
  const [customTexts, setCustomTexts] = useState(loadCustomTexts);
  const allTexts = useMemo(() => [...DEFAULT_TEXTS, ...customTexts], [customTexts]);

  const [selectedId, setSelectedId] = useState(() => allTexts[0]?.id ?? "");
  const [typed, setTyped] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const textareaRef = useRef(null);
  const textContainerRef = useRef(null);
  const activeCharRef = useRef(null);

  const current = allTexts.find(t => t.id === selectedId) ?? allTexts[0];
  const target = current?.text ?? "";
  const isCustomSelected = customTexts.some(t => t.id === selectedId);

  // Reset progress whenever the selected text changes, following React's
  // "adjust state during render" pattern instead of an effect.
  const [typedForId, setTypedForId] = useState(selectedId);
  if (selectedId !== typedForId) {
    setTypedForId(selectedId);
    setTyped("");
  }

  function handleChange(e) {
    let value = e.target.value.slice(0, target.length);
    // The reference text's line breaks aren't something the user types —
    // auto-insert them as soon as typing reaches that point, instead of
    // requiring an Enter keypress.
    while (target[value.length] === "\n") {
      value += "\n";
    }
    setTyped(value);
  }

  function handleAddText(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;
    const entry = { id: `custom-${Date.now()}`, title: newTitle.trim(), text: newText };
    const next = [...customTexts, entry];
    setCustomTexts(next);
    saveCustomTexts(next);
    setSelectedId(entry.id);
    setNewTitle("");
    setNewText("");
    setShowAddForm(false);
  }

  function handleDeleteCustom(id) {
    const next = customTexts.filter(t => t.id !== id);
    setCustomTexts(next);
    saveCustomTexts(next);
    if (id === selectedId) {
      setSelectedId(DEFAULT_TEXTS[0]?.id ?? next[0]?.id ?? "");
    }
  }

  function restart() {
    setTyped("");
    textareaRef.current?.focus();
  }

  // Auto-scroll the reference text so the active character stays in view.
  useEffect(() => {
    activeCharRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [typed, selectedId]);

  const correctCount = useMemo(() => {
    let c = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) c++;
    }
    return c;
  }, [typed, target]);

  const isComplete = target.length > 0 && typed.length >= target.length;
  const accuracy = typed.length > 0 ? Math.round((correctCount / typed.length) * 100) : 100;

  const lines = target.split("\n");
  let globalIndex = 0;

  return (
    <div style={{
      height: "100%",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e8e8f0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 16px",
      overflowY: "auto",
    }}>
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>
          <span style={{ color: "#7eb8f7" }}>הקלדה</span>
          <span style={{ color: "#aaa", fontSize: 13, marginLeft: 10, fontWeight: 400 }}>Typing Practice</span>
        </h1>

        {/* Text selector + add button */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{
              background: "#2a2a4a", color: "#e8e8f0", border: "1px solid #444",
              borderRadius: 10, padding: "8px 12px", fontSize: 14, cursor: "pointer",
            }}
          >
            {allTexts.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
          {isCustomSelected && (
            <button
              onClick={() => handleDeleteCustom(selectedId)}
              style={{
                background: "none", border: "1px solid #444", borderRadius: 8,
                color: "#f97316", cursor: "pointer", fontSize: 12, padding: "6px 10px",
              }}
            >
              eliminar
            </button>
          )}
          <button
            onClick={() => setShowAddForm(v => !v)}
            style={{
              background: showAddForm ? "#7eb8f7" : "#2a2a4a",
              color: showAddForm ? "#0f0f1a" : "#aaa",
              border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 12, padding: "6px 12px", fontWeight: 700,
            }}
          >
            + agregar texto
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddText}
            style={{
              background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 14,
              padding: 16, marginBottom: 20, display: "flex", flexDirection: "column", gap: 10,
            }}
          >
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Título"
              dir="rtl"
              style={{
                background: "#0f0f1a", border: "1px solid #444", borderRadius: 8,
                padding: "8px 12px", color: "#fff", fontSize: 14,
              }}
            />
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Pegá el texto en hebreo acá..."
              dir="rtl"
              rows={5}
              style={{
                background: "#0f0f1a", border: "1px solid #444", borderRadius: 8,
                padding: "8px 12px", color: "#fff", fontSize: 16,
                resize: "vertical", fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" style={btnStyle("#4ade80", "#0f0f1a")}>Guardar</button>
              <button type="button" onClick={() => setShowAddForm(false)} style={btnStyle("#2a2a4a", "#aaa")}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Reference text with per-character highlighting */}
        <div
          ref={textContainerRef}
          onClick={() => textareaRef.current?.focus()}
          dir="rtl"
          style={{
            background: "#14142a", border: "1px solid #2a2a4a", borderRadius: 16,
            padding: 28, fontSize: 26, lineHeight: 1.9, cursor: "text", marginBottom: 16,
            height: "min(45vh, 500px)", overflowY: "auto", scrollBehavior: "smooth",
          }}
        >
          {lines.map((line, li) => {
            const rendered = line.split("").map((ch) => {
              const idx = globalIndex++;
              let color = "#555";
              let background = "transparent";
              let textDecoration = "none";
              const isActive = idx === typed.length;
              if (idx < typed.length) {
                const ok = typed[idx] === ch;
                color = ok ? "#4ade80" : "#f87171";
                background = ok ? "transparent" : "#f8717125";
                textDecoration = ok ? "none" : "underline";
              } else if (isActive) {
                background = "#7eb8f755";
              }
              return (
                <span
                  key={idx}
                  ref={isActive ? activeCharRef : null}
                  style={{ color, background, textDecoration, borderRadius: 3 }}
                >
                  {ch}
                </span>
              );
            });
            globalIndex++; // account for the "\n" between lines
            return <div key={li}>{rendered}</div>;
          })}
        </div>

        {/* Typing input */}
        <textarea
          ref={textareaRef}
          value={typed}
          onChange={handleChange}
          dir="rtl"
          autoFocus
          rows={1}
          placeholder="..."
          style={{
            width: "100%", background: "#1a1a2e", border: "1px solid #444", borderRadius: 12,
            padding: 14, fontSize: 26, lineHeight: 1.9, color: "#e8e8f0", fontFamily: "inherit", resize: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, fontSize: 13, color: "#888" }}>
          <span>{typed.length} / {target.length} · precisión {accuracy}%</span>
          <button
            onClick={restart}
            style={{
              background: "none", border: "1px solid #444", borderRadius: 8,
              color: "#666", cursor: "pointer", fontSize: 12, padding: "5px 12px",
            }}
          >
            reiniciar
          </button>
        </div>

        {isComplete && (
          <div style={{
            marginTop: 24, background: "#1a2a1a", border: "1px solid #4ade80",
            borderRadius: 16, padding: 24, textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            <h2 style={{ color: "#4ade80", margin: "0 0 6px", fontSize: 18 }}>¡Texto completado!</h2>
            <p style={{ color: "#aaa", margin: "0 0 16px", fontSize: 14 }}>
              {correctCount} / {target.length} caracteres correctos ({accuracy}%)
            </p>
            <button onClick={restart} style={btnStyle("#7eb8f7", "#0f0f1a")}>Reintentar</button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import HebrewFlashcards from "./pages/HebrewFlashcards.jsx";
import TypingPractice from "./pages/TypingPractice.jsx";

const PAGES = {
  home: Home,
  flashcards: HebrewFlashcards,
  typing: TypingPractice,
};

export default function App() {
  const [page, setPage] = useState("flashcards");
  const Page = PAGES[page];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar current={page} onSelect={setPage} />
      <main style={{ flex: 1, minWidth: 0, height: "100vh" }}>
        <Page />
      </main>
      <Analytics />
    </div>
  );
}

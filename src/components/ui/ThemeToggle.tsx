"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setIsDark(current !== "light");
  }, []);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setIsDark(!isDark);

    // Disable transitions for one frame so the switch is instant (no dark→light flash)
    const html = document.documentElement;
    html.classList.add("no-theme-transition");
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    requestAnimationFrame(() => html.classList.remove("no-theme-transition"));
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle w-8 h-8 flex items-center justify-center rounded-lg border transition-colors duration-200 cursor-pointer"
      style={{ borderColor: "var(--border-strong)", backgroundColor: "var(--surface)" }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

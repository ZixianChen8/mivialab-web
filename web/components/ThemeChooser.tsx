"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME_ID,
  THEME_STORAGE_KEY,
  THEMES,
  getThemeById,
  type ThemeDefinition,
} from "@/lib/themes";

export function ThemeChooser() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || DEFAULT_THEME_ID;
    setActiveId(current);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const match = THEMES.find((t) => t.key === e.key);
      if (match) {
        e.preventDefault();
        applyTheme(match.id, true);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const root = document.getElementById("theme-chooser");
      if (root && target && !root.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  function applyTheme(id: string, persist: boolean) {
    const theme = getThemeById(id);
    document.documentElement.setAttribute("data-theme", theme.id);
    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme.id);
      } catch {
        /* ignore */
      }
    }
    setActiveId(theme.id);
  }

  const active = getThemeById(activeId);

  return (
    <div className="theme-chooser" id="theme-chooser">
      <button
        className="theme-chooser__toggle"
        type="button"
        id="theme-chooser-toggle"
        aria-expanded={open}
        aria-controls="theme-chooser-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="theme-chooser__dots" aria-hidden="true">
          {active.swatches.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </span>
        <span className="theme-chooser__label">Color systems</span>
      </button>

      <div
        className="theme-chooser__panel"
        id="theme-chooser-panel"
        role="dialog"
        aria-labelledby="theme-chooser-title"
        hidden={!open}
      >
        <div className="theme-chooser__head">
          <div>
            <h2 id="theme-chooser-title">Color systems</h2>
            <p>Preview live. Choice saves in this browser.</p>
          </div>
          <button
            className="theme-chooser__close"
            type="button"
            aria-label="Close color systems"
            onClick={() => setOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <ul className="theme-chooser__list">
          {THEMES.map((theme: ThemeDefinition) => {
            const isActive = theme.id === activeId;
            return (
              <li key={theme.id}>
                <button
                  type="button"
                  className={`theme-chooser__option${isActive ? " is-active" : ""}`}
                  data-theme-id={theme.id}
                  aria-pressed={isActive}
                  onClick={() => applyTheme(theme.id, true)}
                >
                  <span className="theme-chooser__swatches" aria-hidden="true">
                    {theme.swatches.map((color) => (
                      <i key={color} style={{ background: color }} />
                    ))}
                  </span>
                  <span className="theme-chooser__meta">
                    <strong>{theme.name}</strong>
                    <span>{theme.blurb}</span>
                  </span>
                  <span className="theme-chooser__key">{theme.key}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="theme-chooser__hint">
          Active: <span className="theme-chooser__current">{active.name}</span>
          · Keys <kbd>1</kbd>–<kbd>0</kbd> when panel is open · <kbd>Esc</kbd> closes
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_FONT_ID,
  FONT_GROUPS,
  FONT_STORAGE_KEY,
  getFontById,
  getFontPreviewStack,
  getFontsByCategory,
  type FontDefinition,
} from "@/lib/fonts";

export function FontChooser() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(DEFAULT_FONT_ID);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-font") || DEFAULT_FONT_ID;
    setActiveId(current);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const root = document.getElementById("font-chooser");
      if (root && target && !root.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  function applyFont(id: string, persist: boolean) {
    const font = getFontById(id);
    document.documentElement.setAttribute("data-font", font.id);
    if (persist) {
      try {
        localStorage.setItem(FONT_STORAGE_KEY, font.id);
      } catch {
        /* ignore */
      }
    }
    setActiveId(font.id);
  }

  const active = getFontById(activeId);

  return (
    <div className="font-chooser" id="font-chooser">
      <button
        className="font-chooser__toggle"
        type="button"
        id="font-chooser-toggle"
        aria-expanded={open}
        aria-controls="font-chooser-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="font-chooser__sample"
          aria-hidden="true"
          style={{ fontFamily: getFontPreviewStack(active) }}
        >
          Aa
        </span>
        <span className="font-chooser__label">Fonts</span>
      </button>

      <div
        className="font-chooser__panel"
        id="font-chooser-panel"
        role="dialog"
        aria-labelledby="font-chooser-title"
        hidden={!open}
      >
        <div className="font-chooser__head">
          <div>
            <h2 id="font-chooser-title">Fonts</h2>
            <p>Preview live. Choice saves in this browser.</p>
          </div>
          <button
            className="font-chooser__close"
            type="button"
            aria-label="Close fonts"
            onClick={() => setOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="font-chooser__groups">
          {FONT_GROUPS.map((group) => {
            const fonts = getFontsByCategory(group.category);
            if (!fonts.length) return null;

            return (
              <section key={group.category} className="font-chooser__group">
                <h3 className="font-chooser__group-label">{group.label}</h3>
                <ul className="font-chooser__list">
                  {fonts.map((font: FontDefinition) => {
                    const isActive = font.id === activeId;
                    return (
                      <li key={font.id}>
                        <button
                          type="button"
                          className={`font-chooser__option${isActive ? " is-active" : ""}`}
                          data-font-id={font.id}
                          aria-pressed={isActive}
                          onClick={() => applyFont(font.id, true)}
                        >
                          <span
                            className="font-chooser__preview"
                            aria-hidden="true"
                            style={{ fontFamily: getFontPreviewStack(font) }}
                          >
                            Aa
                          </span>
                          <span className="font-chooser__meta">
                            <strong>{font.name}</strong>
                            {font.source === "self" ? (
                              <span>Self-hosted · add files to web/public/fonts/</span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="font-chooser__hint">
          Active: <span className="font-chooser__current">{active.name}</span>
          · <kbd>Esc</kbd> closes
        </p>
      </div>
    </div>
  );
}

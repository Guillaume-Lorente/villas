"use client";

import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

// Éditeur visuel « type Word » pour la rédactrice.
// - Mode WYSIWYG uniquement (pas de markdown visible) : barre d'outils gras,
//   italique, titres, listes, citation, et bouton lien avec saisie d'URL.
// - Enregistre en markdown (getMarkdown) → compatible avec les articles
//   existants et le rendu du site (markdown -> HTML).
// On instancie le cœur « vanilla » de Toast UI dans un effet client pour
// éviter tout souci de SSR (l'éditeur a besoin de window/document).
export default function MarkdownEditor({ initialValue = "", onChange }) {
  const elRef = useRef(null);
  const editorRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { default: Editor } = await import("@toast-ui/editor");
      try {
        await import("@toast-ui/editor/dist/i18n/fr-fr");
      } catch {
        // si la locale FR ne charge pas, on reste en anglais (icônes identiques)
      }
      if (cancelled || !elRef.current) return;

      const editor = new Editor({
        el: elRef.current,
        height: "520px",
        initialEditType: "wysiwyg",
        hideModeSwitch: true,
        language: "fr-FR",
        autofocus: false,
        initialValue: initialValue || "",
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["ul", "ol", "quote"],
          ["link"],
        ],
        events: {
          change: () => onChangeRef.current?.(editor.getMarkdown()),
        },
      });

      editorRef.current = editor;
      // Synchronise l'état du parent dès le montage.
      onChangeRef.current?.(editor.getMarkdown());
    })();

    return () => {
      cancelled = true;
      try {
        editorRef.current?.destroy();
      } catch {
        // ignore
      }
      editorRef.current = null;
    };
    // Montage unique : l'éditeur n'est pas re-rendu quand initialValue change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={elRef} />;
}

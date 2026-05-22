"use client";

import Script from "next/script";

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: Record<string, unknown>) => void;
      run: (config?: Record<string, unknown>) => Promise<void>;
    };
  }
}

export function MermaidRenderer() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.mermaid?.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            background: "#ffffff",
            primaryColor: "#e8f5f3",
            primaryTextColor: "#17202a",
            primaryBorderColor: "#0f766e",
            lineColor: "#5f6b7a",
            secondaryColor: "#fff7ed",
            tertiaryColor: "#f6f8fb",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "18px",
            nodeTextColor: "#17202a",
          },
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            nodeSpacing: 46,
            rankSpacing: 58,
          },
          sequence: {
            messageFontSize: 16,
            actorFontSize: 16,
            noteFontSize: 16,
          },
        });
        window.mermaid?.run();
      }}
    />
  );
}

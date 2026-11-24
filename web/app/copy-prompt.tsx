"use client";

import { useState } from "react";

export default function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="self-start font-sans text-[13px] tracking-wide text-ink-soft underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent cursor-pointer"
    >
      {copied ? "copied — paste it in the chat" : "copy this prompt"}
    </button>
  );
}

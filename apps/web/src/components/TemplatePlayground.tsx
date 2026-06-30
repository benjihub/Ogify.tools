"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TemplateId = "blog" | "product" | "saas";

const TEMPLATES: Record<TemplateId, { tag: string; title: string; author: string }> = {
  blog: {
    tag: "Blog template",
    title: "Shipping a side project in a weekend",
    author: "by Sarah Chen · ogify.dev",
  },
  product: {
    tag: "Product template",
    title: "Introducing the v2.0 dashboard",
    author: "Acme Inc. · acme.io",
  },
  saas: {
    tag: "SaaS template",
    title: "Now with team workspaces",
    author: "Flowbase · flowbase.app",
  },
};

export function TemplatePlayground() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("blog");
  const [title, setTitle] = useState(TEMPLATES.blog.title);
  const [author, setAuthor] = useState(TEMPLATES.blog.author);

  function selectTemplate(id: TemplateId) {
    setActiveTemplate(id);
    setTitle(TEMPLATES[id].title);
    setAuthor(TEMPLATES[id].author);
  }

  return (
    <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded border border-line-dim bg-ink-soft p-6">
        <div className="mb-5 flex gap-2">
          {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => (
            <button
              key={id}
              onClick={() => selectTemplate(id)}
              className={cn(
                "flex-1 rounded border px-0 py-2.5 font-mono text-xs uppercase tracking-wide",
                activeTemplate === id
                  ? "border-cinnabar bg-cinnabar/10 text-paper"
                  : "border-line-dim text-muted"
              )}
            >
              {id}
            </button>
          ))}
        </div>

        <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-line">
          Title
        </label>
        <input
          value={title}
          maxLength={70}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded border border-line-dim bg-ink px-3 py-2.5 text-sm text-paper focus:outline-none focus:border-cinnabar"
        />

        <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-line">
          Author / site
        </label>
        <input
          value={author}
          maxLength={40}
          onChange={(e) => setAuthor(e.target.value)}
          className="mb-2 w-full rounded border border-line-dim bg-ink px-3 py-2.5 text-sm text-paper focus:outline-none focus:border-cinnabar"
        />

        <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-line">
          Renders are cached at the edge after the first request, so this same
          image will load instantly when shared on Twitter, LinkedIn or Discord.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative aspect-[1200/630] overflow-hidden rounded border border-line-dim bg-gradient-to-br from-[#23303A] to-[#171E26]">
          <div className="absolute right-6 top-6 flex h-[108px] w-[108px] items-center justify-center rounded-full border-[3px] border-cinnabar">
            <span className="text-center font-mono text-[9.5px] uppercase leading-relaxed tracking-wider text-cinnabar">
              Ogify
              <br />
              Rendered
            </span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-gold">
              {TEMPLATES[activeTemplate].tag}
            </div>
            <div className="font-display text-3xl normal-case leading-tight text-paper">
              {title || "Untitled"}
            </div>
            <div className="mt-2.5 font-mono text-xs text-muted">{author}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PlanId } from "@/lib/paddle";
import { StatCards } from "@/components/dashboard/StatCards";
import { Quickstart } from "@/components/dashboard/Quickstart";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { ApiKeysPanel } from "@/components/dashboard/ApiKeysPanel";
import { BillingPanel } from "@/components/dashboard/BillingPanel";
import { RecentRenders } from "@/components/dashboard/RecentRenders";
import { TemplateGallery } from "@/components/dashboard/TemplateGallery";

// ── Shared types (used by child components) ───────────────────────────────

export interface ApiKeyDisplay {
  id: string;
  keyPreview: string | null;   // first 20 chars of raw key — safe to show
  lastUsedAt: string | null;
  createdAt: string;
}

export interface SubscriptionDisplay {
  plan: PlanId;
  rendersLimit: number;
  status: string;
  currentPeriodEnd: string | null;
}

export interface DailyUsage {
  date: string;   // YYYY-MM-DD
  count: number;
}

export interface RenderLog {
  id: string;
  type: "template" | "url";
  templateId: string | null;
  status: "success" | "error" | "rate_limited";
  durationMs: number | null;
  createdAt: string;
}

// ── Mock data (replace with render_logs table queries) ────────────────────
// Schema to add:
//   create table public.render_logs (
//     id uuid primary key default gen_random_uuid(),
//     user_id uuid references auth.users(id),
//     type text check (type in ('template','url')),
//     template_id text,
//     status text check (status in ('success','error','rate_limited')),
//     duration_ms int,
//     created_at timestamptz not null default now()
//   );

function getMockDailyData(): DailyUsage[] {
  // Deterministic counts — replace with:
  //   SELECT date_trunc('day', created_at)::date AS date, count(*)
  //   FROM render_logs WHERE user_id = $1 AND created_at > now() - interval '30 days'
  //   GROUP BY 1 ORDER BY 1
  const counts = [4,7,12,8,15,23,31,18,9,14,22,35,28,41,38,26,33,19,11,24,30,17,8,21,29,36,24,15,28,22];
  const now = new Date();
  return counts.map((count, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return { date: d.toISOString().slice(0, 10), count };
  });
}

function getMockRecentRenders(): RenderLog[] {
  const n = Date.now();
  return [
    { id:"1", type:"template", templateId:"blog",    status:"success",      durationMs:340,  createdAt: new Date(n - 2*60000).toISOString() },
    { id:"2", type:"url",      templateId:null,       status:"success",      durationMs:1240, createdAt: new Date(n - 45*60000).toISOString() },
    { id:"3", type:"template", templateId:"product",  status:"success",      durationMs:280,  createdAt: new Date(n - 3*3600000).toISOString() },
    { id:"4", type:"template", templateId:"saas",     status:"error",        durationMs:null, createdAt: new Date(n - 5*3600000).toISOString() },
    { id:"5", type:"url",      templateId:null,       status:"success",      durationMs:980,  createdAt: new Date(n - 24*3600000).toISOString() },
    { id:"6", type:"template", templateId:"blog",     status:"rate_limited", durationMs:null, createdAt: new Date(n - 26*3600000).toISOString() },
    { id:"7", type:"template", templateId:"product",  status:"success",      durationMs:295,  createdAt: new Date(n - 48*3600000).toISOString() },
  ];
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const period = new Date().toISOString().slice(0, 7);

  // Parallel data fetches
  const [{ data: subRow }, { data: usageRow }, { data: keyRows }] =
    await Promise.all([
      supabase
        .from("subscriptions")
        .select("plan, renders_limit, status, current_period_end")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("usage")
        .select("renders_used")
        .eq("user_id", user.id)
        .eq("period", period)
        .single(),
      supabase
        .from("api_keys")
        .select("id, key_preview, last_used_at, created_at")
        .eq("user_id", user.id)
        .is("revoked_at", null)
        .order("created_at", { ascending: false }),
    ]);

  const subscription: SubscriptionDisplay = {
    plan:             (subRow?.plan as PlanId) ?? "free",
    rendersLimit:     subRow?.renders_limit ?? 100,
    status:           subRow?.status ?? "active",
    currentPeriodEnd: subRow?.current_period_end ?? null,
  };

  const rendersUsed = usageRow?.renders_used ?? 0;

  const apiKeys: ApiKeyDisplay[] = (keyRows ?? []).map((k) => ({
    id:          k.id,
    keyPreview:  k.key_preview ?? null,
    lastUsedAt:  k.last_used_at ?? null,
    createdAt:   k.created_at,
  }));

  const firstName =
    (user.email?.split("@")[0] ?? "there")
      .split(".")
      .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isNewUser = rendersUsed < 5;
  const dailyData = getMockDailyData();
  const recentRenders = getMockRecentRenders();

  return (
    <div className="space-y-8">
      {/* ── Welcome ────────────────────────────────────── */}
      <div>
        <h1 className="font-display text-[28px] uppercase tracking-wide text-fg">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Member since {memberSince}
        </p>
      </div>

      {/* ── Stat cards ─────────────────────────────────── */}
      <StatCards
        subscription={subscription}
        rendersUsed={rendersUsed}
        period={period}
        apiKeys={apiKeys}
      />

      {/* ── Quickstart ─────────────────────────────────── */}
      <Quickstart
        isNewUser={isNewUser}
        keyPreview={apiKeys[0]?.keyPreview ?? null}
      />

      {/* ── Usage chart ────────────────────────────────── */}
      <UsageChart
        data={dailyData}
        rendersUsed={rendersUsed}
        rendersLimit={subscription.rendersLimit}
      />

      {/* ── Keys + Billing ─────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ApiKeysPanel keys={apiKeys} />
        <BillingPanel
          subscription={subscription}
          userEmail={user.email ?? ""}
        />
      </div>

      {/* ── Recent renders ─────────────────────────────── */}
      <RecentRenders renders={recentRenders} totalRendersUsed={rendersUsed} />

      {/* ── Template gallery ───────────────────────────── */}
      <TemplateGallery />
    </div>
  );
}

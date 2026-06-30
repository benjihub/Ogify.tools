import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | undefined;

export async function getPaddleInstance(): Promise<Paddle | undefined> {
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    environment:
      (process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production") ??
      "sandbox",
  });

  return paddleInstance;
}

export const PADDLE_PRICE_IDS = {
  starter: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER ?? "",
  pro: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO ?? "",
  business: process.env.NEXT_PUBLIC_PADDLE_PRICE_BUSINESS ?? "",
  lifetime: process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFETIME ?? "",
} as const;

export type PlanId = keyof typeof PADDLE_PRICE_IDS;

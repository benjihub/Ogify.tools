"use client";

import { useState, type ReactNode } from "react";
import {
  getPaddleInstance,
  PADDLE_PRICE_IDS,
  type CheckoutPlanId,
} from "@/lib/paddle";
import { Button } from "@/components/ui/button";

interface PaddleCheckoutProps {
  plan: CheckoutPlanId;
  email?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "paper";
  className?: string;
}

export function PaddleCheckout({
  plan,
  email,
  children,
  variant = "primary",
  className,
}: PaddleCheckoutProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const paddle = await getPaddleInstance();
      paddle?.Checkout.open({
        items: [{ priceId: PADDLE_PRICE_IDS[plan], quantity: 1 }],
        customer: email ? { email } : undefined,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      variant={variant}
      className={className}
    >
      {loading ? "Opening checkout…" : children}
    </Button>
  );
}

export type Env = {
  Bindings: {
    ENVIRONMENT: "development" | "preview" | "production";
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    PADDLE_WEBHOOK_SECRET: string;
    BROWSER?: Fetcher;
  };
  Variables: {
    userId?: string;
  };
};

export type OgImageTemplate = "blog" | "product";

export type RenderRequest = {
  template: OgImageTemplate;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  brand?: string;
};

export type ApiKeyRecord = {
  id: string;
  key_hash: string;
  user_id: string;
  usage_count: number;
  usage_limit: number;
  active: boolean;
};

export type PaddleWebhookEvent = {
  event_type: string;
  data: Record<string, unknown>;
};

type CaptureResult =
  | { ok: true }
  | { ok: false; skipped?: boolean; reason: string };

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue | undefined };

type BrowserContext = {
  locale: string | null;
  page_path: string | null;
  referrer: string | null;
  user_agent: string | null;
  metadata: Record<string, JsonValue>;
};

type EnergyIntentEventType =
  | "bluerock_click"
  | "email_click"
  | "pdf_open"
  | "project_focus_click"
  | "news_article_click";

type EnergyIntentEventInput = {
  eventType: EnergyIntentEventType;
  label: string;
  targetUrl: string;
  metadata?: Record<string, JsonValue>;
};

type EnergyContactSubmissionInput = {
  name: string;
  email: string;
  interest?: string;
  message: string;
  metadata?: Record<string, JsonValue>;
};

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function getSupabaseConfig() {
  return {
    url: cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL),
    key: cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  };
}

export function hasEnergyBackendConfig() {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
}

function getBrowserContext(extraMetadata?: Record<string, JsonValue>): BrowserContext {
  if (typeof window === "undefined") {
    return {
      locale: null,
      page_path: null,
      referrer: null,
      user_agent: null,
      metadata: extraMetadata ?? {},
    };
  }

  return {
    locale: window.navigator.language || null,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    referrer: document.referrer || null,
    user_agent: window.navigator.userAgent || null,
    metadata: {
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      ...extraMetadata,
    },
  };
}

async function insertRow(table: "energy_contact_submissions" | "energy_intent_events", payload: unknown): Promise<CaptureResult> {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return { ok: false, skipped: true, reason: "Supabase browser configuration is not available." };
  }

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
        prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) {
      return { ok: false, reason: `${response.status} ${response.statusText}` };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "Unknown Supabase insert error." };
  }
}

function cleanOptionalText(value: string | undefined) {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

export function recordEnergyIntentEvent(input: EnergyIntentEventInput): Promise<CaptureResult> {
  return insertRow("energy_intent_events", {
    source: "aixco_energy_site",
    event_type: input.eventType,
    label: input.label.trim(),
    target_url: input.targetUrl,
    ...getBrowserContext(input.metadata),
  });
}

export function recordBlueRockClick(label: string, metadata?: Record<string, JsonValue>) {
  return recordEnergyIntentEvent({
    eventType: "bluerock_click",
    label,
    targetUrl: "https://bluerock.cc",
    metadata,
  });
}

export function recordEmailClick(label: string, email: string, metadata?: Record<string, JsonValue>) {
  return recordEnergyIntentEvent({
    eventType: "email_click",
    label,
    targetUrl: `mailto:${email}`,
    metadata,
  });
}

export function recordPdfOpen(label: string, targetUrl: string, metadata?: Record<string, JsonValue>) {
  return recordEnergyIntentEvent({
    eventType: "pdf_open",
    label,
    targetUrl,
    metadata,
  });
}

export function submitEnergyContactSubmission(input: EnergyContactSubmissionInput): Promise<CaptureResult> {
  return insertRow("energy_contact_submissions", {
    source: "energy_contact_form",
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    interest: cleanOptionalText(input.interest),
    message: input.message.trim(),
    ...getBrowserContext(input.metadata),
  });
}

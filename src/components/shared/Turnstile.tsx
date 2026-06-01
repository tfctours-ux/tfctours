// src/components/shared/Turnstile.tsx
"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          action?: string;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface TurnstileProps {
  onToken: (token: string) => void;
  onError?: () => void;
  action?: string;
}

export function Turnstile({ onToken, onError, action }: TurnstileProps) {
  const containerId = useId();
  const stableId = containerId.replace(/:/g, "_");
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Keep callback refs current without re-triggering the init effect.
  // Must be in useEffect (not render body) per React 19 rules.
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Stable wrapper that always calls the latest onToken ref
  const handleToken = useCallback((token: string) => {
    onTokenRef.current(token);
  }, []);

  const handleError = useCallback(() => {
    onErrorRef.current?.();
  }, []);

  useEffect(() => {
    if (!sitekey) {
      console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY missing — Turnstile disabled.");
      return;
    }
    let cancelled = false;
    function init() {
      if (cancelled) return;
      const ts = window.turnstile;
      if (!ts) {
        setTimeout(init, 200);
        return;
      }
      const el = document.getElementById(stableId);
      if (!el) return;
      widgetIdRef.current = ts.render(el, {
        sitekey: sitekey ?? "",
        callback: handleToken,
        "error-callback": handleError,
        "expired-callback": handleError,
        appearance: "interaction-only",
        action,
      });
    }
    init();
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [stableId, sitekey, action, handleToken, handleError]);

  if (!sitekey) return null;

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" async defer />
      <div id={stableId} className="cf-turnstile" aria-label="Security verification" />
    </>
  );
}

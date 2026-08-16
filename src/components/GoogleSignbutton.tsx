import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

import { googleLogin } from "@/api/auth";
import { useAuth } from "@/lib/auth-context";

declare global {
  interface Window {
    google?: any;
  }
}

export function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { refresh } = useAuth();

  useEffect(() => {
    const clientId = import.meta.env["VITE_GOOGLE_CLIENT_ID"] as string | undefined;
    if (!clientId) {
      console.error("VITE_GOOGLE_CLIENT_ID is missing");
      return;
    }

    function initializeGoogle() {
      if (!window.google || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,

        callback: async (response: any) => {
          try {
            await googleLogin(response.credential);

            await refresh();

            await navigate({
              to: "/dashboard",
              replace: true,
            });
          } catch (error) {
            console.error("Google login failed:", error);
          }
        },
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 350,
          text: "continue_with",
        },
      );
    }

    if (window.google) {
      initializeGoogle();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", initializeGoogle);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [navigate, refresh]);

  return (
    <div className="flex w-full justify-center">
      <div ref={buttonRef} />
    </div>
  );
}
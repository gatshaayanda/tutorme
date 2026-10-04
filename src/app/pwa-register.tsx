"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaRegister() {
  const [offline, setOffline] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setOffline(!navigator.onLine);

    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstallEvent(null);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    setInstallEvent(null);
  }

  return (
    <>
      {installEvent && (
        <div className="installPrompt" role="region" aria-label="Install TutorMe">
          <div>
            <strong>Install TutorMe</strong>
            <span>Keep TutorMe on your phone for quick access to study resources and updates.</span>
          </div>
          <div className="installActions">
            <button className="installButton" type="button" onClick={() => void install()}>
              Install
            </button>
            <button className="installDismiss" type="button" onClick={() => setInstallEvent(null)} aria-label="Dismiss install prompt">
              Not now
            </button>
          </div>
        </div>
      )}
      {offline && (
        <div className="offlineBanner">
          Offline · cached TutorMe content remains available. Enquiries are saved locally and will sync when connection returns.
        </div>
      )}
    </>
  );
}
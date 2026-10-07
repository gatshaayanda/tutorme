"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { createWorkspace, getMyWorkspaces } from "@/lib/firebase/data";

export default function RegisterCentre() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setChecking(false);
      if (!nextUser) return;

      try {
        const workspaces = await getMyWorkspaces(nextUser.uid);
        if (workspaces[0]) {
          router.replace("/workspace/" + workspaces[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not check your existing workspace.");
      }
    });
  }, [router]);

  async function continueWithGoogle() {
    setBusy(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String((err as { code?: unknown }).code)
          : "";

      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setBusy(false);
        return;
      }

      setError(
        code === "auth/unauthorized-domain"
          ? "Google sign-in is blocked because this website domain is not authorized in Firebase Authentication."
          : err instanceof Error
            ? err.message
            : "Google sign-in failed."
      );
      setBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setBusy(true);
    setError("");

    try {
      const existing = await getMyWorkspaces(user.uid);
      if (existing[0]) {
        router.replace("/workspace/" + existing[0].id);
        return;
      }

      const id = await createWorkspace({
        name: form.name.trim(),
        slug:
          form.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") +
          "-" +
          user.uid.slice(0, 6),
        ownerUid: user.uid,
        contactEmail: user.email ?? "",
        phone: form.phone.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
      });

      router.replace("/workspace/" + id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your tuition workspace.");
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <main className="adminPage">
        <div className="adminShell">
          <section className="adminPanel">
            <span className="eyebrow">TutorMe for tuition centres</span>
            <h1>Checking your workspace.</h1>
          </section>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="adminPage">
        <div className="adminShell">
          <div className="adminTop">
            <div>
              <span className="eyebrow">TutorMe for tuition centres</span>
              <h1>Create your workspace.</h1>
              <p>
                Sign in with Google first. If you are new to TutorMe, you&apos;ll then set up your
                centre and become its workspace Owner.
              </p>
            </div>
          </div>
          <section className="adminPanel authPanel">
            {error && <p className="error">{error}</p>}
            <button className="button primary" onClick={() => void continueWithGoogle()} disabled={busy}>
              {busy ? "Opening Google…" : "Continue with Google"}
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="adminPage">
      <div className="adminShell">
        <div className="adminTop">
          <div>
            <span className="eyebrow">TutorMe for tuition centres</span>
            <h1>Set up your centre.</h1>
            <p>
              Signed in as {user.email}. These details create your private workspace. After that,
              TutorMe will take you through notification setup before normal workspace work.
            </p>
          </div>
          <button className="button ghost" onClick={() => void signOut(auth)}>
            Sign out
          </button>
        </div>

        <section className="adminPanel">
          <form className="adminForm compact" onSubmit={submit}>
            <input
              placeholder="Tuition centre name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Centre phone / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
            <textarea
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {error && <p className="error">{error}</p>}
            <button className="button primary" disabled={busy}>
              {busy ? "Creating workspace…" : "Create tuition workspace"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

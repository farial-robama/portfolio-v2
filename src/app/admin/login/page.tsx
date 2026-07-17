"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-2 px-6">
      <div className="w-full max-w-[360px]">
        <div className="mb-8 text-center">
          <div className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Admin
          </div>
          <h1 className="font-serif text-[26px] mt-1">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-rule rounded-lg p-6">
          <div className="mb-4">
            <label className="font-mono text-[11px] uppercase text-ink-soft">Email</label>
            <input
              name="email"
              type="email"
              required
              autoFocus
              className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
            />
          </div>
          <div className="mb-5">
            <label className="font-mono text-[11px] uppercase text-ink-soft">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
            />
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-solid w-full justify-center"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
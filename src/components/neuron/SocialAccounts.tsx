"use client";

import { useState } from "react";
import { Camera, Globe, Briefcase, MessageCircle, Check, X } from "lucide-react";
import type { ComponentType } from "react";

type Account = {
  platform: string;
  connected: boolean;
  username: string | null;
};

const platforms: { key: string; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "instagram", label: "Instagram", icon: Camera },
  { key: "facebook", label: "Facebook", icon: Globe },
  { key: "linkedin", label: "LinkedIn", icon: Briefcase },
  { key: "twitter", label: "X / Twitter", icon: MessageCircle },
];

export default function SocialAccounts({
  initialAccounts,
}: {
  initialAccounts: Account[];
}) {
  const byPlatform = new Map(initialAccounts.map((a) => [a.platform, a]));

  const [accounts, setAccounts] = useState<Record<string, Account>>(
    Object.fromEntries(
      platforms.map((p) => [
        p.key,
        byPlatform.get(p.key) ?? { platform: p.key, connected: false, username: null },
      ])
    )
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  const startConnecting = (platform: string) => {
    setEditing(platform);
    setUsernameInput("");
    setError("");
  };

  const cancelConnecting = () => {
    setEditing(null);
    setError("");
  };

  const confirmConnect = async (platform: string) => {
    if (!usernameInput.trim()) {
      setError("Escribe tu nombre de usuario");
      return;
    }

    setPending(platform);
    const res = await fetch(`/api/social-accounts/${platform}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ connected: true, username: usernameInput }),
    });
    setPending(null);

    if (!res.ok) {
      setError("No se pudo conectar la cuenta");
      return;
    }

    const updated = await res.json();
    setAccounts((prev) => ({ ...prev, [platform]: updated }));
    setEditing(null);
  };

  const disconnect = async (platform: string) => {
    setPending(platform);
    const res = await fetch(`/api/social-accounts/${platform}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ connected: false }),
    });
    setPending(null);

    if (res.ok) {
      const updated = await res.json();
      setAccounts((prev) => ({ ...prev, [platform]: updated }));
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {platforms.map(({ key, label, icon: Icon }) => {
        const account = accounts[key];
        const isEditing = editing === key;
        const isPending = pending === key;

        return (
          <div
            key={key}
            className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-950 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-gray-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-gray-500">
                    {account.connected
                      ? `@${account.username}`
                      : "No conectada"}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  account.connected
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {account.connected ? "Conectada" : "Sin conectar"}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="tu_usuario"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmConnect(key)}
                    disabled={isPending}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Confirmar
                  </button>
                  <button
                    onClick={cancelConnecting}
                    className="flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-800"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : account.connected ? (
              <button
                onClick={() => disconnect(key)}
                disabled={isPending}
                className="self-start text-xs font-medium text-red-400 hover:underline disabled:opacity-50"
              >
                Desconectar
              </button>
            ) : (
              <button
                onClick={() => startConnecting(key)}
                className="self-start rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
              >
                Conectar cuenta
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

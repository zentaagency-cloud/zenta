"use client";

import { useState } from "react";
import { Check, X, ShieldCheck } from "lucide-react";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  approved: boolean;
  createdAt: string;
};

export default function UsersTable({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserRow[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const updateUser = async (id: string, data: Partial<UserRow>) => {
    setPendingId(id);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setPendingId(null);

    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500">
            <th className="px-5 py-3 font-semibold">Usuario</th>
            <th className="px-5 py-3 font-semibold">Rol</th>
            <th className="px-5 py-3 font-semibold">Acceso</th>
            <th className="px-5 py-3 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isMe = u.id === currentUserId;
            return (
              <tr key={u.id} className="border-b border-gray-900 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-medium text-white">
                    {u.name || "Sin nombre"}
                    {isMe && (
                      <span className="ml-2 text-xs text-gray-500">(tú)</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </td>
                <td className="px-5 py-4">
                  {u.role === "admin" ? (
                    <span className="flex w-fit items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                      <ShieldCheck className="h-3 w-3" />
                      Admin
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300">
                      Miembro
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      u.approved
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {u.approved ? "Con acceso" : "Pendiente"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {!isMe && (
                      <button
                        disabled={pendingId === u.id}
                        onClick={() => updateUser(u.id, { approved: !u.approved })}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
                          u.approved
                            ? "border border-gray-700 text-gray-300 hover:bg-gray-800"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {u.approved ? (
                          <>
                            <X className="h-3.5 w-3.5" />
                            Quitar acceso
                          </>
                        ) : (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Dar acceso
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

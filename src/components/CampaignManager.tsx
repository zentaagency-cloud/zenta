"use client";

import { useState } from "react";

type Campaign = {
  id: string;
  name: string;
  description: string | null;
  status: string;
};

const statusLabels: Record<string, string> = {
  draft: "Borrador",
  active: "Activa",
  finished: "Finalizada",
};

export default function CampaignManager({
  initialCampaigns,
}: {
  initialCampaigns: Campaign[];
}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "No se pudo crear la campaña");
      return;
    }

    const created = await res.json();
    setCampaigns((prev) => [created, ...prev]);
    setName("");
    setDescription("");
  };

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch(`/api/campaigns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre de la campaña
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Lanzamiento de verano"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Opcional"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear campaña"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.length === 0 && (
          <p className="text-sm text-gray-500">
            Aún no tienes campañas. Crea la primera arriba.
          </p>
        )}
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
              {campaign.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {campaign.description}
                </p>
              )}
            </div>

            <select
              value={campaign.status}
              onChange={(e) => handleStatusChange(campaign.id, e.target.value)}
              className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleDelete(campaign.id)}
              className="self-start text-sm font-medium text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

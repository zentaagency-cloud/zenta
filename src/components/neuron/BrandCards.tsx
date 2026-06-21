"use client";

import { useState } from "react";
import {
  MapPin,
  Fingerprint,
  Sparkles,
  Activity,
  Quote,
  TrendingUp,
  ShieldAlert,
  Pencil,
  Check,
  X,
} from "lucide-react";

export type BrandProfileData = {
  location: string;
  sector: string;
  status: string;
  whatSells: string;
  whatDifferentiates: string;
  positioning: string;
  opportunities: string[];
  risks: string[];
};

const defaults: BrandProfileData = {
  location: "Ciudad de México, MX",
  sector: "Inteligencia Artificial",
  status: "Activa · En crecimiento",
  whatSells:
    "Agentes de IA a medida que automatizan operaciones, atención al cliente y procesos de negocio para empresas que buscan escalar sin aumentar headcount.",
  whatDifferentiates:
    "Combina consultoría estratégica con implementación técnica end-to-end: desde el diagnóstico del proceso hasta el agente en producción, en semanas y no meses.",
  positioning:
    "“La consultora de IA agéntica para equipos que quieren resultados, no demos.”",
  opportunities: [
    "Demanda creciente de automatización con IA en LATAM",
    "Pocos competidores con enfoque 100% agéntico",
    "Posibilidad de productizar soluciones recurrentes",
  ],
  risks: [
    "Dependencia de proveedores de modelos externos",
    "Curva de adopción en clientes poco digitalizados",
    "Presión de precios por nuevos entrantes",
  ],
};

function linesToList(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function CardShell({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";

const textareaClass = `${inputClass} resize-none`;

export default function BrandCards({
  initialProfile,
  canEdit = false,
}: {
  initialProfile?: Partial<BrandProfileData> | null;
  canEdit?: boolean;
}) {
  const merged: BrandProfileData = {
    ...defaults,
    ...initialProfile,
    opportunities:
      initialProfile?.opportunities && initialProfile.opportunities.length > 0
        ? initialProfile.opportunities
        : defaults.opportunities,
    risks:
      initialProfile?.risks && initialProfile.risks.length > 0
        ? initialProfile.risks
        : defaults.risks,
  };

  const [profile, setProfile] = useState<BrandProfileData>(merged);
  const [draft, setDraft] = useState<BrandProfileData>(merged);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startEditing = () => {
    setDraft(profile);
    setError("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const res = await fetch("/api/brand-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draft,
        opportunities: JSON.stringify(draft.opportunities),
        risks: JSON.stringify(draft.risks),
      }),
    });

    setSaving(false);

    if (!res.ok) {
      setError("No se pudieron guardar los cambios");
      return;
    }

    setProfile(draft);
    setEditing(false);
  };

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Lo que define tu marca
          </h2>
        </div>

        {canEdit &&
          (editing ? (
            <div className="flex items-center gap-2">
              {error && <span className="text-xs text-red-600">{error}</span>}
              <button
                onClick={cancelEditing}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X className="h-3.5 w-3.5" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                <Check className="h-3.5 w-3.5" />
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          ) : (
            <button
              onClick={startEditing}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </button>
          ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Datos clave */}
        <CardShell title="Datos clave" icon={Fingerprint}>
          {editing ? (
            <div className="space-y-2.5">
              <input
                className={inputClass}
                value={draft.location}
                placeholder="Ubicación"
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              />
              <input
                className={inputClass}
                value={draft.sector}
                placeholder="Sector"
                onChange={(e) => setDraft({ ...draft, sector: e.target.value })}
              />
              <input
                className={inputClass}
                value={draft.status}
                placeholder="Estado"
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              />
            </div>
          ) : (
            <ul className="space-y-2.5">
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Ubicación</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {profile.location}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Sector</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {profile.sector}
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Estado</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {profile.status}
                </span>
              </li>
            </ul>
          )}
        </CardShell>

        {/* Qué vende */}
        <CardShell title="Qué vende" icon={Sparkles}>
          {editing ? (
            <textarea
              className={textareaClass}
              rows={4}
              value={draft.whatSells}
              onChange={(e) => setDraft({ ...draft, whatSells: e.target.value })}
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {profile.whatSells}
            </p>
          )}
        </CardShell>

        {/* Qué la diferencia */}
        <CardShell title="Qué la diferencia" icon={Activity}>
          {editing ? (
            <textarea
              className={textareaClass}
              rows={4}
              value={draft.whatDifferentiates}
              onChange={(e) =>
                setDraft({ ...draft, whatDifferentiates: e.target.value })
              }
            />
          ) : (
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {profile.whatDifferentiates}
            </p>
          )}
        </CardShell>

        {/* Posicionamiento */}
        <CardShell title="Posicionamiento" icon={Quote}>
          {editing ? (
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.positioning}
              onChange={(e) => setDraft({ ...draft, positioning: e.target.value })}
            />
          ) : (
            <p className="text-sm font-medium italic leading-relaxed text-gray-700 dark:text-gray-200">
              {profile.positioning}
            </p>
          )}
        </CardShell>

        {/* Oportunidades */}
        <CardShell title="Oportunidades" icon={TrendingUp}>
          {editing ? (
            <textarea
              className={textareaClass}
              rows={4}
              value={draft.opportunities.join("\n")}
              placeholder="Una por línea"
              onChange={(e) =>
                setDraft({ ...draft, opportunities: linesToList(e.target.value) })
              }
            />
          ) : (
            <ul className="space-y-2.5">
              {profile.opportunities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardShell>

        {/* Riesgos */}
        <CardShell title="Riesgos" icon={ShieldAlert}>
          {editing ? (
            <textarea
              className={textareaClass}
              rows={4}
              value={draft.risks.join("\n")}
              placeholder="Una por línea"
              onChange={(e) =>
                setDraft({ ...draft, risks: linesToList(e.target.value) })
              }
            />
          ) : (
            <ul className="space-y-2.5">
              {profile.risks.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardShell>
      </div>
    </section>
  );
}

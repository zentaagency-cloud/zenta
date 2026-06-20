import { Share2, Camera, Globe, Briefcase, MessageCircle } from "lucide-react";

const accounts = [
  { name: "Instagram", icon: Camera, status: "Conectado", followers: "2,4 mil" },
  { name: "Facebook", icon: Globe, status: "Conectado", followers: "1,1 mil" },
  { name: "LinkedIn", icon: Briefcase, status: "Sin conectar", followers: "—" },
  { name: "X / Twitter", icon: MessageCircle, status: "Sin conectar", followers: "—" },
];

export default function SocialPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Share2 className="h-4.5 w-4.5" />
        </span>
        <div>
          <h1 className="text-lg font-bold text-white">Redes sociales</h1>
          <p className="text-sm text-gray-400">
            Conecta y supervisa tus canales sociales desde un solo lugar.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {accounts.map(({ name, icon: Icon, status, followers }) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-2xl border border-gray-800 bg-gray-950 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-gray-300">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-gray-500">{followers} seguidores</p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                status === "Conectado"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

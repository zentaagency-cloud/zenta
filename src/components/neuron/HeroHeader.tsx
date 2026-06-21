import ThemeToggle from "./ThemeToggle";

type HeroUser = {
  name?: string | null;
  email?: string | null;
};

function getInitials(user?: HeroUser) {
  const source = user?.name || user?.email || "?";
  return source
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function HeroHeader({ user }: { user?: HeroUser }) {
  return (
    <div className="animate-fade-in relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 shadow-lg shadow-blue-600/20 sm:p-8">
      {/* Decorative glow blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white ring-1 ring-white/25 backdrop-blur-sm">
            Z
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Zenta
              </h1>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                Free
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-100">
              Bienvenido de nuevo, {user?.name || user?.email || "Usuario"}
            </p>
            <button className="mt-3 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition-transform hover:scale-[1.03] hover:shadow-md">
              Gestionar plan
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm ring-1 ring-white/15">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700">
              {getInitials(user)}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-white">
                {user?.name || user?.email || "Usuario"}
              </p>
              <p className="text-xs text-blue-100">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

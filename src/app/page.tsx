import Link from "next/link";

const features = [
  {
    title: "Gestiona campañas",
    description:
      "Crea, organiza y da seguimiento a todas tus campañas de marketing desde un solo panel.",
  },
  {
    title: "Acceso seguro",
    description:
      "Cada cuenta protegida con correo y contraseña, para que tu información esté a salvo.",
  },
  {
    title: "Resultados claros",
    description:
      "Visualiza el estado de tus campañas: borrador, activa o finalizada, en cualquier momento.",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-sky-500 via-blue-800 to-slate-950 text-white">
      {/* Decorative glow blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="text-xl font-bold text-white">Zenta</span>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-sky-100 hover:text-white"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-lg shadow-black/20 transition-transform hover:scale-[1.03]"
          >
            Crear cuenta
          </Link>
        </nav>
      </header>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-12">
        <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-sky-100 backdrop-blur-sm">
          Marketing impulsado por datos
        </span>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Marketing simple,{" "}
          <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
            resultados reales
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-sky-100/90">
          Zenta te ayuda a planear y controlar tus campañas de marketing en un
          solo lugar, accesible desde cualquier dispositivo.
        </p>
        <div className="mt-9 flex gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-xl shadow-black/20 transition-transform hover:scale-[1.03]"
          >
            Empezar gratis
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </section>

      <section className="relative z-10 grid gap-6 px-6 py-16 sm:grid-cols-3 sm:px-12">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/15"
          >
            <h3 className="text-lg font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-sky-100/80">{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 px-6 py-8 text-center text-sm text-sky-100/50 sm:px-12">
        © {new Date().getFullYear()} Zenta. Todos los derechos reservados.
      </footer>
    </main>
  );
}

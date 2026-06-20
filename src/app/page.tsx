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

      <div className="sticky top-4 z-20 mx-auto w-full max-w-3xl px-4 sm:px-0">
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <span className="text-base font-bold tracking-tight text-white">
            Zenta
          </span>

          <nav className="hidden items-center gap-7 text-sm font-medium text-white/70 sm:flex">
            <a href="#inicio" className="transition-colors hover:text-white">
              Inicio
            </a>
            <a href="#funciones" className="transition-colors hover:text-white">
              Funciones
            </a>
            <Link href="/login" className="transition-colors hover:text-white">
              Iniciar sesión
            </Link>
          </nav>

          <Link
            href="/register"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-md shadow-black/20 transition-transform hover:scale-[1.04]"
          >
            Crear cuenta
          </Link>
        </header>
      </div>

      <section
        id="inicio"
        className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-12"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-900/80 via-blue-900/75 to-slate-950/85" />

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
      </section>

      <section
        id="funciones"
        className="relative z-10 grid gap-6 px-6 py-16 sm:grid-cols-3 sm:px-12"
      >
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

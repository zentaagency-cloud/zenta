import Link from "next/link";
import { Check } from "lucide-react";

const features = [
  {
    title: "Diseño Web",
    description:
      "Creamos páginas web atractivas y funcionales que reflejan la identidad de tu marca y mejoran la experiencia del usuario.",
  },
  {
    title: "SEO",
    description:
      "Optimizamos tu web para mejorar su visibilidad en Google, aumentando el tráfico orgánico y las conversiones.",
  },
  {
    title: "Redes Sociales",
    description:
      "Te ayudamos a tener unas redes sociales profesionales ya sea Instagram, Facebook o Tik Tok.",
  },
  {
    title: "SEM",
    description:
      "Hacemos que tu web obtenga más visibilidad y clientes a través de Google Ads.",
  },
];

const plans = [
  {
    name: "Básica",
    price: "$19",
    period: "/mes",
    description: "Para quienes están empezando a organizar su marketing.",
    features: [
      "Hasta 5 campañas activas",
      "1 usuario en el equipo",
      "Panel de marca (Brand Cards)",
      "Soporte por correo",
    ],
    highlighted: false,
  },
  {
    name: "Avanzada",
    price: "$49",
    period: "/mes",
    description: "Para equipos que necesitan más control y colaboración.",
    features: [
      "Campañas ilimitadas",
      "Hasta 10 usuarios en el equipo",
      "Aprobación y roles de usuario",
      "Soporte prioritario",
    ],
    highlighted: true,
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-black text-white">

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
            <a href="#precios" className="transition-colors hover:text-white">
              Precios
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
        className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-12"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-75"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-black" />

        <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-300 backdrop-blur-sm">
          Marketing impulsado por datos
        </span>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Marketing simple,{" "}
          <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
            resultados reales
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-400">
          Zenta te ayuda a planear y controlar tus campañas de marketing en un
          solo lugar, accesible desde cualquier dispositivo.
        </p>
      </section>

      <section
        id="funciones"
        className="relative z-10 mx-auto grid max-w-4xl gap-6 px-6 py-16 sm:grid-cols-2 sm:px-12"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-800 bg-black p-8 text-center transition-transform hover:-translate-y-1 hover:border-gray-700"
          >
            <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-blue-600/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-orange-600/30 blur-3xl" />

            <h3 className="relative text-2xl font-medium text-white">
              {feature.title}
            </h3>
            <p className="relative mt-4 max-w-xs text-sm text-amber-100/70">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section
        id="precios"
        className="relative z-10 px-6 py-20 sm:px-12"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Elige tu membresía
          </h2>
          <p className="mt-3 text-gray-400">
            Empieza con lo básico o desbloquea todo el potencial de tu equipo.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-sky-400/40 bg-gradient-to-b from-sky-500/10 to-transparent"
                  : "border-gray-800 bg-gray-950"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold text-slate-950">
                  Más popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{plan.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`mt-8 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  plan.highlighted
                    ? "bg-white text-blue-700"
                    : "border border-gray-700 text-white hover:bg-gray-900"
                }`}
              >
                Empezar con {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 px-6 py-8 text-center text-sm text-gray-500 sm:px-12">
        © {new Date().getFullYear()} Zenta. Todos los derechos reservados.
      </footer>
    </main>
  );
}

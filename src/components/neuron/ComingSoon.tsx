import type { ComponentType } from "react";

export default function ComingSoon({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-10 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
        <Icon className="h-6 w-6" />
      </span>
      <h1 className="text-xl font-bold text-white">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-400">{description}</p>
      <span className="mt-5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
        Próximamente
      </span>
    </div>
  );
}

import { Dna, Package, Share2, ShoppingBag, Users, Settings } from "lucide-react";

const actions = [
  { label: "Genoma", icon: Dna },
  { label: "Kit", icon: Package },
  { label: "Social", icon: Share2 },
  { label: "Tienda", icon: ShoppingBag },
  { label: "Usuarios", icon: Users },
  { label: "Configuración", icon: Settings },
];

export default function QuickActions() {
  return (
    <div
      className="animate-fade-in grid grid-cols-3 gap-3 sm:grid-cols-6"
      style={{ animationDelay: "80ms" }}
    >
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900/50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

import Link from "next/link";
import { Bell } from "lucide-react";

export default function PendingApprovalsBanner({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <Link
      href="/dashboard/usuarios"
      className="animate-fade-in flex items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 transition-colors hover:bg-amber-500/15"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
          <Bell className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium text-amber-200">
          {count === 1
            ? "Hay 1 cuenta nueva esperando tu aprobación"
            : `Hay ${count} cuentas nuevas esperando tu aprobación`}
        </p>
      </div>
      <span className="shrink-0 text-xs font-semibold text-amber-300 underline">
        Revisar
      </span>
    </Link>
  );
}

"use client";

import {
  LayoutGrid,
  Share2,
  FolderKanban,
  Video,
  ShoppingBag,
  Settings,
  Files,
  Package,
  Dna,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

type SidebarUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
};

function getInitials(user?: SidebarUser) {
  const source = user?.name || user?.email || "?";
  return source
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const primaryNav = [
  { label: "Panel", icon: LayoutGrid, href: "/dashboard" },
  { label: "Social", icon: Share2, href: "/dashboard/social" },
  { label: "Proyectos", icon: FolderKanban, href: "/dashboard/proyectos" },
  { label: "Reuniones", icon: Video, href: "/dashboard/reuniones" },
  { label: "Tienda", icon: ShoppingBag, href: "/dashboard/tienda" },
];

const secondaryNav = [
  { label: "Genoma", icon: Dna, href: "/dashboard/genoma" },
  { label: "Kit", icon: Package, href: "/dashboard/kit" },
  { label: "Archivos", icon: Files, href: "/dashboard/archivos" },
  { label: "Configuración", icon: Settings, href: "/dashboard/configuracion" },
];

export default function Sidebar({
  forceVisible = false,
  user,
  pendingCount = 0,
}: {
  forceVisible?: boolean;
  user?: SidebarUser;
  pendingCount?: number;
}) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  const renderItem = (item: {
    label: string;
    icon: typeof LayoutGrid;
    href: string;
    badge?: number;
  }) => {
    const isActive =
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname?.startsWith(item.href);
    const Icon = item.icon;

    return (
      <Link
        key={item.label}
        href={item.href}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
            : "text-gray-300 hover:bg-gray-800 hover:translate-x-0.5"
        }`}
      >
        <Icon
          className={`h-4.5 w-4.5 shrink-0 ${
            isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
          }`}
        />
        <span className="flex-1">{item.label}</span>
        {!!item.badge && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`h-screen w-64 shrink-0 flex-col border-r border-gray-800 bg-black px-4 py-6 ${
        forceVisible ? "flex" : "hidden lg:flex"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-md shadow-blue-500/30">
          Z
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Zenta</p>
        </div>
        <span className="ml-auto rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-400">
          Free
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col gap-1">{primaryNav.map(renderItem)}</nav>

      <div className="my-5 h-px bg-gray-800" />

      {/* Secondary nav */}
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        Recursos
      </p>
      <nav className="flex flex-col gap-1">{secondaryNav.map(renderItem)}</nav>

      {isAdmin && (
        <>
          <div className="my-5 h-px bg-gray-800" />
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Administración
          </p>
          <nav className="flex flex-col gap-1">
            {renderItem({
              label: "Usuarios",
              icon: Users,
              href: "/dashboard/usuarios",
              badge: pendingCount,
            })}
          </nav>
        </>
      )}

      {/* Footer / user */}
      <div className="mt-auto flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-xs font-semibold text-white">
            {getInitials(user)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || user?.email || "Usuario"}
            </p>
            <p className="truncate text-xs text-gray-400">{user?.email || ""}</p>
          </div>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}

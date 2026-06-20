import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/neuron/Sidebar";
import MobileSidebarToggle from "@/components/neuron/MobileSidebarToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const sessionUser = session!.user;

  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });

  if (!dbUser?.approved) {
    redirect("/pendiente-aprobacion");
  }

  const user = { ...sessionUser, role: dbUser.role };

  const pendingCount =
    dbUser.role === "admin"
      ? await prisma.user.count({ where: { approved: false } })
      : 0;

  return (
    <div className="dark flex min-h-screen bg-black">
      <Sidebar user={user} pendingCount={pendingCount} />

      <main className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-center justify-between lg:hidden">
            <span className="text-sm font-semibold text-white">
              Neuron Hybrid
            </span>
            <MobileSidebarToggle user={user} pendingCount={pendingCount} />
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

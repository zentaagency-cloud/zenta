import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/neuron/UsersTable";

export default async function UsuariosPage() {
  const session = await auth();
  const me = await prisma.user.findUnique({ where: { id: session!.user.id } });

  if (me?.role !== "admin") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      approved: true,
      createdAt: true,
    },
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-lg font-bold text-white">Usuarios</h1>
        <p className="text-sm text-gray-400">
          Da o quita acceso al panel para cada cuenta registrada.
        </p>
      </div>

      <UsersTable
        initialUsers={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
        currentUserId={session!.user.id}
      />
    </div>
  );
}

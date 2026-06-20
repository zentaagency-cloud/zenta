import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Hourglass } from "lucide-react";
import SignOutButton from "@/components/neuron/SignOutButton";

export default async function PendingApprovalPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (user?.approved) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 text-center shadow-xl shadow-black/40">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
          <Hourglass className="h-6 w-6" />
        </span>
        <h1 className="text-xl font-bold text-white">
          Tu cuenta está pendiente de aprobación
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Un administrador necesita darte acceso antes de que puedas entrar al
          panel. Te avisaremos en cuanto esté listo.
        </p>
        <div className="mt-6 flex justify-center">
          <SignOutButton className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800" />
        </div>
      </div>
    </main>
  );
}

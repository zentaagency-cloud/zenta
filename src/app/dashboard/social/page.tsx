import { Share2 } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SocialAccounts from "@/components/neuron/SocialAccounts";

export default async function SocialPage() {
  const session = await auth();
  const user = session!.user;

  const accounts = await prisma.socialAccount.findMany({
    where: { userId: user.id },
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Share2 className="h-4.5 w-4.5" />
        </span>
        <div>
          <h1 className="text-lg font-bold text-white">Redes sociales</h1>
          <p className="text-sm text-gray-400">
            Conecta tus cuentas para gestionarlas desde aquí.
          </p>
        </div>
      </div>

      <SocialAccounts initialAccounts={accounts} />
    </div>
  );
}

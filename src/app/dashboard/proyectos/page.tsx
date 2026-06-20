import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CampaignManager from "@/components/CampaignManager";

export default async function ProyectosPage() {
  const session = await auth();
  const user = session!.user;

  const campaigns = await prisma.campaign.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="animate-fade-in">
      <h1 className="mb-1 text-lg font-bold text-white">
        Tus campañas de marketing
      </h1>
      <p className="mb-5 text-sm text-gray-400">
        Crea y gestiona tus campañas desde aquí.
      </p>
      <CampaignManager initialCampaigns={campaigns} />
    </section>
  );
}

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import HeroHeader from "@/components/neuron/HeroHeader";
import QuickActions from "@/components/neuron/QuickActions";
import BrandCards from "@/components/neuron/BrandCards";
import CampaignManager from "@/components/CampaignManager";
import PendingApprovalsBanner from "@/components/neuron/PendingApprovalsBanner";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user;

  const [campaigns, brandProfile, dbUser] = await Promise.all([
    prisma.campaign.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.brandProfile.findUnique({ where: { userId: user.id } }),
    prisma.user.findUnique({ where: { id: user.id } }),
  ]);

  const pendingCount =
    dbUser?.role === "admin"
      ? await prisma.user.count({ where: { approved: false } })
      : 0;

  const brandProfileData = brandProfile
    ? {
        location: brandProfile.location ?? undefined,
        sector: brandProfile.sector ?? undefined,
        status: brandProfile.status ?? undefined,
        whatSells: brandProfile.whatSells ?? undefined,
        whatDifferentiates: brandProfile.whatDifferentiates ?? undefined,
        positioning: brandProfile.positioning ?? undefined,
        opportunities: brandProfile.opportunities
          ? (JSON.parse(brandProfile.opportunities) as string[])
          : undefined,
        risks: brandProfile.risks
          ? (JSON.parse(brandProfile.risks) as string[])
          : undefined,
      }
    : null;

  return (
    <>
      <PendingApprovalsBanner count={pendingCount} />
      <HeroHeader user={user} />
      <QuickActions />
      <BrandCards initialProfile={brandProfileData} />

      <section>
        <h2 className="mb-1 text-lg font-bold text-white">
          Tus campañas de marketing
        </h2>
        <p className="mb-5 text-sm text-gray-400">
          Crea y gestiona tus campañas desde aquí.
        </p>
        <CampaignManager initialCampaigns={campaigns} />
      </section>
    </>
  );
}

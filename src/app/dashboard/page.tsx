import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import HeroHeader from "@/components/neuron/HeroHeader";
import QuickActions from "@/components/neuron/QuickActions";
import BrandCards from "@/components/neuron/BrandCards";
import PendingApprovalsBanner from "@/components/neuron/PendingApprovalsBanner";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user;

  const [brandProfile, dbUser] = await Promise.all([
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
    </>
  );
}

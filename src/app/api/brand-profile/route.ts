import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const profile = await prisma.brandProfile.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const {
    location,
    sector,
    status,
    whatSells,
    whatDifferentiates,
    positioning,
    opportunities,
    risks,
  } = body;

  const data = {
    location,
    sector,
    status,
    whatSells,
    whatDifferentiates,
    positioning,
    opportunities,
    risks,
  };

  const profile = await prisma.brandProfile.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { ...data, userId: session.user.id },
  });

  return NextResponse.json(profile);
}

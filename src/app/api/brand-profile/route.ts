import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getCanonicalAdmin() {
  return prisma.user.findFirst({
    where: { role: "admin" },
    orderBy: { createdAt: "asc" },
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const admin = await getCanonicalAdmin();
  if (!admin) {
    return NextResponse.json(null);
  }

  const profile = await prisma.brandProfile.findUnique({
    where: { userId: admin.id },
  });

  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const me = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (me?.role !== "admin") {
    return NextResponse.json(
      { error: "Solo un administrador puede editar la marca" },
      { status: 403 }
    );
  }

  const canonicalAdmin = await getCanonicalAdmin();
  const targetUserId = canonicalAdmin?.id ?? session.user.id;

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
    where: { userId: targetUserId },
    update: data,
    create: { ...data, userId: targetUserId },
  });

  return NextResponse.json(profile);
}

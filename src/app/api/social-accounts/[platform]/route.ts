import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_PLATFORMS = ["instagram", "facebook", "linkedin", "twitter"];

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { platform } = await params;
  if (!VALID_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Red no válida" }, { status: 400 });
  }

  const { connected, username } = await req.json();

  if (connected && !username?.trim()) {
    return NextResponse.json(
      { error: "Indica tu nombre de usuario para conectar" },
      { status: 400 }
    );
  }

  const account = await prisma.socialAccount.upsert({
    where: { userId_platform: { userId: session.user.id, platform } },
    update: {
      connected: !!connected,
      username: connected ? username.trim() : null,
    },
    create: {
      userId: session.user.id,
      platform,
      connected: !!connected,
      username: connected ? username.trim() : null,
    },
  });

  return NextResponse.json(account);
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const accounts = await prisma.socialAccount.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(accounts);
}

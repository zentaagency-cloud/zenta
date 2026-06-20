import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "admin") return null;

  return user;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;

  if (id === admin.id) {
    return NextResponse.json(
      { error: "No puedes modificar tu propia cuenta" },
      { status: 400 }
    );
  }

  const { approved, role } = await req.json();

  const data: { approved?: boolean; role?: string } = {};
  if (typeof approved === "boolean") data.approved = approved;
  if (role === "admin" || role === "member") data.role = role;

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      approved: true,
      createdAt: true,
    },
  });

  return NextResponse.json(updated);
}

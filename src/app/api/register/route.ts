import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email y contraseña son obligatorios" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese correo" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const userCount = await prisma.user.count();
  const isFirstUser = userCount === 0;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: isFirstUser ? "admin" : "member",
      approved: isFirstUser,
    },
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    approved: user.approved,
  });
}

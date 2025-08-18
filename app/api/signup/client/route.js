import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma"; // Verify this path
import bcrypt from "bcryptjs";
import { clientSignupSchema } from "@/lib/schema/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = clientSignupSchema.parse(body);

    console.log(
      "=========================================",
      Object.keys(prisma)
    );

    const existingUser = await prisma.client.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

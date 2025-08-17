import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { clientSignupSchema } from "@/lib/validations/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = clientSignupSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.client.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.client.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);

    if (error) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 },
        console.log(error)
      );
    }

    if (error.code === "P2002") {
      // Prisma unique constraint violation
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user", details: error.message },
      { status: 500 }
    );
  }
}

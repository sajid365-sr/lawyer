import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { lawyerSignupSchema } from "@/lib/validations/lawyer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      experienceYears,
      legalArea,
      location,
      hourlyRate,
    } = lawyerSignupSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.lawyer.findUnique({
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
    const user = await prisma.lawyer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        experienceYears,
        legalArea,
        location,
        hourlyRate,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
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

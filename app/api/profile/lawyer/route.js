import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request) {
  const session = await auth();
  if (!session || session.user.role !== "lawyer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const profile = await prisma.lawyer.findUnique({ where: { id: userId } });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await auth();
  if (!session || session.user.role !== "lawyer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const data = await request.json();
    const updated = await prisma.lawyer.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        experienceYears: data.experienceYears,
        legalArea: data.legalArea,
        location: data.location,
        hourlyRate: data.hourlyRate,
        profileImage: data.profileImage,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

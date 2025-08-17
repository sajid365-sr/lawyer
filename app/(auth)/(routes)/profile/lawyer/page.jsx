import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LawyerProfile from "./LawyerProfile";

export default async function LawyerProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "lawyer") {
    redirect("/profile/client");
  }

  const profile = await prisma.lawyer.findUnique({
    where: { id: session.user.id },
  });

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-red-600">Profile not found</p>
      </div>
    );
  }

  return <LawyerProfile initialProfile={profile} />;
}

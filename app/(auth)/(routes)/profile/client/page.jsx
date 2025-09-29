import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ClientProfile from "./ClientProfile";

export default async function ClientProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "client") {
    redirect("/profile/lawyer");
  }

  const profile = await prisma.client.findUnique({
    where: { id: session.user.id },
  });

  console.log(profile);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-red-600">Profile not found</p>
      </div>
    );
  }

  return <ClientProfile initialProfile={profile} />;
}

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button asChild>
              <Link
                href="/signup/client"
                className="w-full py-3 px-4 font-medium"
              >
                Create Client Account
              </Link>
            </Button>
            <Button asChild variant="success">
              <Link
                href="/signup/lawyer"
                className="w-full py-3 px-4 font-medium"
              >
                Create Lawyer Account
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

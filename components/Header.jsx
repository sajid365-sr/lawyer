"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("Session data in Header:", session, "Status:", status);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  const getDashboardLink = () => {
    if (!session?.user?.role) return null;
    return session.user.role === "lawyer"
      ? "/dashboard/lawyer"
      : "/dashboard/client";
  };
  const getProfileLink = () => {
    if (!session?.user?.role) return null;
    return session.user.role === "lawyer"
      ? "/profile/lawyer"
      : "/profile/client";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Find Your Lawyer home"
          >
            <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy-900">
              Find Your Lawyer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
              aria-label="Home page"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
              aria-label="Browse lawyers"
            >
              Browse Lawyers
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
              aria-label="Frequently asked questions"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
              aria-label="Contact us"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            {status === "authenticated" && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={session.user.image || "/placeholder-avatar.jpg"}
                      alt={session.user.name || "User profile"}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink() || "#"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={getProfileLink() || "#"}>profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-2 px-4 bg-navy-600 rounded-lg hover:bg-navy-700 transition-colors font-medium"
                  aria-label="Sign in"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="py-2 px-4 bg-navy-600 rounded-lg hover:bg-navy-700 transition-colors font-medium"
                  aria-label="Sign up"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-navy-600 font-medium"
                aria-label="Home page"
              >
                Home
              </Link>
              <Link
                href="/browse"
                className="text-gray-700 hover:text-navy-600 font-medium"
                aria-label="Browse lawyers"
              >
                Browse Lawyers
              </Link>
              <Link
                href="/register-lawyer"
                className="text-gray-700 hover:text-navy-600 font-medium"
                aria-label="Join as a lawyer"
              >
                Join as Lawyer
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-navy-600 font-medium"
                aria-label="Frequently asked questions"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-navy-600 font-medium"
                aria-label="Contact us"
              >
                Contact
              </Link>
              {status === "authenticated" && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={session.user.image || "/placeholder-avatar.jpg"}
                          alt={session.user.name || "User profile"}
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink() || "#"}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getProfileLink() || "#"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="py-2 px-4 bg-navy-600 rounded-lg hover:bg-navy-700 transition-colors font-medium w-full text-center"
                    aria-label="Sign in"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2 px-4 bg-navy-600  rounded-lg hover:bg-navy-700 transition-colors font-medium w-full text-center"
                    aria-label="Sign up"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

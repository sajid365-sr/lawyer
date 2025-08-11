"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(status === "loading");
  const [error, setError] = useState("");
  const router = useRouter();

  const getDashboardLink = () => {
    if (!session?.user) return "/";
    return session.user.role === "LAWYER"
      ? "/dashboard/lawyer"
      : "/dashboard/client";
  };

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await router.push("/api/auth/signin");
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error("Sign-out failed:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(status === "loading");
    if (session?.user) {
      setError(""); // Clear error on successful session
    }
  }, [session, status]);

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
              href="/register-lawyer"
              className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
              aria-label="Join as a lawyer"
            >
              Join as Lawyer
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
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div
                className="flex items-center space-x-2"
                aria-label="Loading user status"
              >
                <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-red-600 text-sm">{error}</div>
            ) : session?.user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={getDashboardLink()}
                  className="text-gray-700 hover:text-navy-600 font-medium transition-colors"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-navy-600 font-medium transition-colors"
                  aria-label={`View profile for ${session.user.name}`}
                >
                  {session.user.profileImage ? (
                    <img
                      src={session.user.profileImage}
                      alt={`Profile image of ${session.user.name}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <span>{session.user.name}</span>
                </Link>
                <Button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  aria-label="Log out"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button onClick={handleSignIn}>Sign In</Button>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                  aria-label="Sign up"
                >
                  Sign Up
                </Link>
              </div>
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

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {loading ? (
                  <div
                    className="flex items-center space-x-2 justify-center"
                    aria-label="Loading user status"
                  >
                    <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading...</span>
                  </div>
                ) : error ? (
                  <div className="text-red-600 text-sm text-center">
                    {error}
                  </div>
                ) : session?.user ? (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="px-4 py-2 text-center text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
                      aria-label="Go to dashboard"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      aria-label={`View profile for ${session.user.name}`}
                    >
                      Profile
                    </Link>
                    <Button
                      type="button"
                      onClick={handleSignOut}
                      className="px-4 py-2 text-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      aria-label="Log out"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/api/auth/signin"
                      className="px-4 py-2 text-center text-navy-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors font-medium"
                      aria-label="Log in"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 text-center bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                      aria-label="Sign up"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

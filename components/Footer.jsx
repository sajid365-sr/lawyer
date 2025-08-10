"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }
    // Simulate newsletter subscription
    setNewsletterMessage("Thank you for subscribing!");
    setEmail("");
    setTimeout(() => setNewsletterMessage(""), 3000);
  };

  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
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
              <span className="text-xl font-bold">Find Your Lawyer</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connect with verified, experienced lawyers in your area. Get
              expert legal advice and representation you can trust.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/findyourlawyer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/findyourlawyer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/findyourlawyer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-required="true"
                />
                {newsletterMessage && (
                  <p
                    className={`text-sm ${
                      newsletterMessage.includes("Thank")
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    {newsletterMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Browse lawyers"
                >
                  Browse Lawyers
                </Link>
              </li>
              <li>
                <Link
                  href="/register-lawyer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Join as a lawyer"
                >
                  Join as Lawyer
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="About us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Contact us"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse?area=family"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Browse family law lawyers"
                >
                  Family Law
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?area=criminal"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Browse criminal law lawyers"
                >
                  Criminal Law
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?area=corporate"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Browse corporate law lawyers"
                >
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?area=real-estate"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Browse real estate lawyers"
                >
                  Real Estate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Find Your Lawyer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white text-sm transition-colors"
              aria-label="Privacy policy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white text-sm transition-colors"
              aria-label="Terms of service"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-300 hover:text-white text-sm transition-colors"
              aria-label="Cookie policy"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-[#070b17]/95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#ff5a1f] flex items-center justify-center">
              <Flame size={22} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-wider ">
              <span className="text-white">FIT</span>
              <span className="text-[#ff5a1f]">SYNC</span>
            </h1>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-all duration-300 ${
                  pathname === item.href
                    ? "text-[#ff5a1f]"
                    : "text-[#8b8ca7] hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="text-[#8b8ca7] hover:text-white transition"
            >
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              className="px-6 py-3 rounded-lg bg-[#ff5a1f] hover:bg-[#ff6b35] text-white font-semibold transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Flame } from "lucide-react";
import { HiMenu, HiX } from "react-icons/hi";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  Button,
  Dropdown,
} from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/auth/signin");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#070b17]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">

          <div className="relative h-20 flex items-center justify-between">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-3xl text-white cursor-pointer"
            >
              {open ? <HiX /> : <HiMenu />}
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">

              <Link href="/" className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-lg bg-[#ff5a1f] flex items-center justify-center">
                  <Flame size={22} className="text-white" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-wider">
                  <span className="text-white">FIT</span>
                  <span className="text-[#ff5a1f]">SYNC</span>
                </h1>

              </Link>

            </div>

            {/* Desktop Navigation */}
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

            {/* Right Side */}
            <div className="flex items-center gap-3">

              {user ? (
                <>
                  <p className="hidden lg:block max-w-32 whitespace-normal text-center font-bold text-blue-500 leading-5">
                    Hi, {user.name}!
                  </p>

                  <div className="hidden md:block">

                    {user.role === "member" && (
                      <Link href="/dashboard/member">
                        <Button variant="secondary" className="rounded-lg text-gray-400">
                          Dashboard
                        </Button>
                      </Link>
                    )}

                    {user.role === "trainer" && (
                      <Link href="/dashboard/trainer">
                        <Button variant="secondary" className="rounded-lg text-gray-400">
                          Dashboard
                        </Button>
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link href="/dashboard/admin">
                        <Button variant="secondary" className="rounded-lg text-gray-400">
                          Dashboard
                        </Button>
                      </Link>
                    )}

                  </div>

                  <Dropdown>

                    <Button
                      className="rounded-full w-10 h-10"
                      aria-label="Menu"
                      variant="outline"
                    >
                      <Avatar className="bg-orange-600">
                        <Avatar.Image
                          src={user.image}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback>
                          {user.name?.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                    </Button>

                    <Dropdown.Popover className="rounded-md">

                      <Dropdown.Menu>

                        <Dropdown.Item id="profile">
                          <Link href="/profile" className="block w-full ml-3">
                            Profile
                          </Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <Button
                            onClick={handleSignOut}
                            variant="secondary"
                            className="text-red-600"
                          >
                            Sign Out
                          </Button>
                        </Dropdown.Item>

                      </Dropdown.Menu>

                    </Dropdown.Popover>

                  </Dropdown>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="hidden sm:block text-[#8b8ca7] hover:text-white transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/signup"
                    className="hidden sm:block px-6 py-3 rounded-lg bg-[#ff5a1f] hover:bg-[#ff6b35] text-white font-semibold transition-all duration-300"
                  >
                    Join Now
                  </Link>
                </>
              )}

            </div>

          </div>

        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden bg-[#101522] border-t border-white/10 shadow-xl">

            <div className="px-5 py-5 flex flex-col gap-4">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-medium ${
                    pathname === item.href
                      ? "text-[#ff5a1f]"
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <>
                  <hr className="border-white/10" />

                  <p className="text-blue-400 font-semibold">
                    Hi, {user.name}
                  </p>

                  {user.role === "member" && (
                    <Link
                      href="/dashboard/member"
                      onClick={() => setOpen(false)}
                      className="text-gray-300"
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === "trainer" && (
                    <Link
                      href="/dashboard/trainer"
                      onClick={() => setOpen(false)}
                      className="text-gray-300"
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setOpen(false)}
                      className="text-gray-300"
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-gray-300"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="text-left text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-white/10" />

                  <Link
                    href="/auth/signin"
                    onClick={() => setOpen(false)}
                    className="text-gray-300"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="bg-[#ff5a1f] text-center py-3 rounded-lg text-white font-semibold"
                  >
                    Join Now
                  </Link>
                </>
              )}

            </div>

          </div>
        )}
      </nav>
    </>
  );
}
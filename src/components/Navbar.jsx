"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { Flame, Moon, Sun } from "lucide-react";
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
  const [theme, setTheme] = useState("dark");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
    { name: "About Us", href: "/about-us" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("fitsync-theme");
    const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    startTransition(() => setTheme(preferredTheme));
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("fitsync-theme", nextTheme);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/auth/signin");
  };

  return (
    <>
      <nav className="theme-nav sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">

          <div className="relative h-20 flex items-center justify-between">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
                className="theme-muted md:hidden text-3xl cursor-pointer"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              {open ? <HiX /> : <HiMenu />}
            </button>

            
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">

              <Link href="/" className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-lg bg-[#ff5a1f] flex items-center justify-center">
                  <Flame size={22} className="text-white" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-wider">
                  <span className="theme-heading">FIT</span>
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
                      : "theme-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "light"}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <span className="theme-toggle-track">
                  <Sun size={13} aria-hidden="true" />
                  <Moon size={13} aria-hidden="true" />
                  <span className="theme-toggle-thumb">
                    {theme === "dark" ? <Moon size={12} aria-hidden="true" /> : <Sun size={12} aria-hidden="true" />}
                  </span>
                </span>
              </button>

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
                    className="theme-muted hidden sm:block transition"
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
          <div className="theme-mobile-menu md:hidden border-t shadow-xl">

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
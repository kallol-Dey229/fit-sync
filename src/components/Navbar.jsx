"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Flame } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community Forum", href: "/community-forum" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;


  const handleSignOut = async () => {

    await authClient.signOut();
    redirect('/auth/signin');

  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-[#070b17]/95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#ff5a1f] flex items-center justify-center">
              <Flame size={22} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-wider ">
              <span className="text-white">FIT</span>
              <span className="text-[#ff5a1f]">SYNC</span>
            </h1>
          </Link>

          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-all duration-300 ${pathname === item.href
                  ? "text-[#ff5a1f]"
                  : "text-[#8b8ca7] hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center gap-5">

            {
              user ? <>
                <p className="max-w-32 whitespace-normal wrap-break-word text-center font-bold text-blue-800 leading-5">Hi, {user.name}!</p>

                <Link href="/dashboard/member">
                  <Button variant="secondary" className={"text-gray-400 rounded-lg"}>Dashboard</Button>
                </Link>


                <Dropdown>

                  <Button className="rounded-full w-10 h-10" aria-label="Menu" variant="outline">
                    <Avatar className="bg-orange-600">
                      <Avatar.Image referrerPolicy="no-referrer" alt="user image" src={user?.image} />
                      <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                  </Button>

                  <Dropdown.Popover className={'rounded-md'}>

                    <Dropdown.Menu>

                      <Dropdown.Item id="profile" textValue="Profile">
                        <Link href="/profile" className="block ml-3 w-full">
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Button onClick={handleSignOut} variant="secondary" className={"text-red-600"}>Sign Out</Button>
                      </Dropdown.Item>


                    </Dropdown.Menu>

                  </Dropdown.Popover>

                </Dropdown>


                



              </> :
                <>
                  <Link
                    href="/auth/signin"
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
                </>
            }


          </div>
        </div>
      </div>
    </nav>
  );
}
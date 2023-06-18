import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { SidebarOption } from "@/types/typings";
import SignOutButton from "@/components/Dashboard/Account/SignOutButton";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import LinksList from "@/components/Dashboard/Account/LinksList";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Posts",
    href: "/dashboard/posts",
  },
  {
    id: 2,
    name: "Settings",
    href: "/dashboard/account",
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <>
      <Toaster />
      <main>
        <div className="w-full flex h-screen">
          <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <div className="-mx-2 mt-2 space-y-1">
                    <LinksList sidebarOptions={sidebarOptions} />
                  </div>
                </li>

                <li className="-mx-6 mt-auto flex items-center">
                  <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <div className="relative h-8 w-8 bg-gray-50">
                      <Image
                        fill
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        src={session.user.image || ""}
                        alt="Your profile picture"
                      />
                    </div>

                    <span className="sr-only">Your profile</span>
                    <div className="flex flex-col">
                      <span aria-hidden="true">{session.user.name}</span>
                      <span
                        className="text-xs text-zinc-400"
                        aria-hidden="true"
                      >
                        {session.user.email}
                      </span>
                    </div>
                  </div>

                  <SignOutButton className={"mr-3"} />
                </li>
              </ul>
            </nav>
          </div>

          <aside className="flex-1 w-full">
            <Navbar />

            <div className={"p-5"}>{children}</div>
          </aside>
        </div>
      </main>
    </>
  );
}

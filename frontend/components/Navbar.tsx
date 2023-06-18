import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "@/components/User/UserAccountNav";
import { FcLinux } from "react-icons/fc";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavDropdown from "@/components/NavDropdown";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar border-b-zinc-700">
      <div className="navbar-start">
        <NavDropdown />
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Prise</a>
      </div>
      <div className="navbar-end">
        {session?.user ? (
          <UserAccountNav user={session?.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

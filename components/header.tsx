import Link from "next/link";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { AvatarWithDropdown } from "./avatarWithDropdown";

export async function Header() {
  const session = await auth();

  return (
    <>
      {session && (
        <nav className="bg-gray-100 text-gray-800 p-4 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold">
                Sundae
              </Link>
              {session && (
                <>
                  <Link href="/dashboard" className="hover:text-gray-600">
                    Home
                  </Link>
                  <Link href="/admin" className="hover:text-gray-600">
                    Admin
                  </Link>
                  <Link href="/reports" className="hover:text-gray-600">
                    Relátorios
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {session && <AvatarWithDropdown session={session} />}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

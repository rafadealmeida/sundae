// import Link from "next/link";

// import { Button } from "@/components/ui/button";

// import { auth } from "@/app/api/auth/[...nextauth]/auth";
// import { AvatarWithDropdown } from "./avatarWithDropdown";

// export async function Header() {
//   const session = await auth();

//   return (
//     <nav className="bg-gray-100 text-gray-800 p-4 shadow-sm">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="text-xl font-bold">
//             Sundae
//           </Link>
//           {session && (
//             <>
//               <Link href="/dashboard" className="hover:text-gray-600">
//                 Home
//               </Link>
//               <Link href="/admin" className="hover:text-gray-600">
//                 Admin
//               </Link>
//               <Link href="/reports" className="hover:text-gray-600">
//                 Relátorios
//               </Link>
//             </>
//           )}
//         </div>
//         <div className="flex items-center space-x-4">
//           {session ? (
//             <AvatarWithDropdown session={session} />
//           ) : (
//             <Link href="/login">
//               <Button variant="ghost">Login</Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { AvatarWithDropdown } from "./avatarWithDropdown";

async function fetchSession() {
  const session = await auth();
  return session;
}

function SessionAwareHeader({
  session,
}: {
  session: Awaited<ReturnType<typeof fetchSession>>;
}) {
  return (
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
                Relatórios
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <AvatarWithDropdown session={session} />
          ) : (
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export async function Header() {
  const sessionPromise = fetchSession();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <SessionWrapper sessionPromise={sessionPromise} />
    </Suspense>
  );
}

async function SessionWrapper({
  sessionPromise,
}: {
  sessionPromise: Promise<ReturnType<typeof fetchSession>>;
}) {
  const session = await sessionPromise;
  return <SessionAwareHeader session={session} />;
}

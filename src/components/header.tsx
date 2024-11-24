import Image from "next/image";
import SignIn from "./ui/sign-in";
import { SignOut } from "./ui/sign-out";
import { auth } from "@/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();
  return (
    <div className="bg-gray-100 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href={"/"}
            className="flex items-center gap-1 hover:underline md:pl-10"
          >
            <Image src={"/logo_big.png"} width={50} height={50} alt="Logo" />
            ByteAuction.com
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href={"/"}
              className="flex items-center gap-1 hover:underline"
            >
              All Auctions
            </Link>
            <Link
              href={"/items/create"}
              className="flex items-center gap-1 hover:underline"
            >
              Create Auction
            </Link>
            <Link
              href={"/auctions"}
              className="flex items-center gap-1 hover:underline"
            >
              My Auctions
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}

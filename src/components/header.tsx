"use client";
import Image from "next/image";
import Link from "next/link";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const session = useSession();

  const userId = session.data?.user.id;

  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

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
            {userId && (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            renderItem={(item) => (
              <div>
                {item.item.data && (
                  <Link
                    onClick={() => setIsVisible(false)}
                    href={`/items/${item.item.data.itemId}`}
                  >
                    Someone outbidded you {item.item.data.itemId}
                  </Link>
                )}
              </div>
            )}
          />

          {session?.data?.user?.image && (
            <Image
              src={session?.data?.user.image}
              width={40}
              height={40}
              alt="user-profile"
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button onClick={() => signOut({ redirectTo: "/" })}>
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => signIn("google")}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

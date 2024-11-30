import { Button } from "@/components/ui/button";
import { emptyStateDiv, pageTitleStyle } from "@/styles/style";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns/formatDistance";
import { formatToDollar } from "@/utils/currency";
import { createBidAction } from "./actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { auth } from "@/auth";
import SignIn from "@/components/ui/sign-in";

function formatTimeStamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true,
  });
}
export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: number }>;
}) {
  const itemId = (await params).itemId;
  const session = await auth();
  const item = await getItem(itemId);
  if (!item) {
    return (
      <div className={emptyStateDiv}>
        <Image
          src={"/void.svg"}
          width={200}
          height={200}
          alt="Void - No Auctions found"
        />
        <h1 className={pageTitleStyle}>Item Not Found</h1>
        <p>
          The item you&apos;re trying to view is invalid. Please go back and
          search for different auction item
        </p>
        <Button asChild>
          <Link href={`/`}>View All Auctions</Link>
        </Button>
      </div>
    );
  }

  const { allBids, hasBids } = await getBidsForItem(itemId);

  const canPlaceBid = session && item.userId !== session.user.id;

  return (
    <main className="container mx-auto space-y-8 py-4">
      <div className="flex flex-col gap-8 sm:flex-row">
        {/* left side */}
        <div className="flex flex-col items-center justify-center gap-6 sm:items-start sm:justify-start">
          <h1 className={pageTitleStyle}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            alt={item.name}
            src={getImageUrl(item.fileKey)}
            width={400}
            height={400}
            className="rounded-xl"
          />
          <div className="text-xl">
            <div>
              Current Bid{" "}
              <span className="font-bold">
                {formatToDollar(item.currentBid)}
              </span>
            </div>

            <div>
              Starting Price of{" "}
              <span className="font-bold">
                {(item.startingPrice / 100).toFixed(2)}
              </span>
            </div>

            <div>
              Bid Interval{" "}
              <span className="font-bold">
                {formatToDollar(item.bidInterval)}
              </span>{" "}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 space-y-8 p-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Current Bids</h2>
            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place My Bid</Button>
              </form>
            )}
          </div>

          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li className="rounded-xl bg-gray-100 p-8" key={bid.id}>
                  <div>
                    <span className="font-bold">
                      {formatToDollar(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.user.name}</span> at{" "}
                    <span className="font-normal">
                      {formatTimeStamp(bid.timestamp)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 rounded-xl bg-gray-100 p-12">
              <Image
                src={"/empty.svg"}
                width={300}
                height={300}
                alt="Void - No Auctions found"
              />
              <h2 className="text-2xl font-bold">No Bids yet!</h2>
              {canPlaceBid ? (
                <form action={createBidAction.bind(null, item.id)}>
                  <Button>Place My Bid</Button>
                </form>
              ) : !(session && session.user.id === item.userId) ? (
                <SignIn />
              ) : (
                <>
                  <Button disabled={true}>Place My Bid</Button>
                  <span className="text-red-500">
                    You can&apos;t place big on your own item
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

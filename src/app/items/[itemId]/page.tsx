import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { emptyStateDiv, pageTitleStyle } from "@/styles/style";
import { getImageUrl } from "@/utils/files";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns/formatDistance";
import { formatToDollar } from "@/utils/currency";

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

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
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
  const bids: any[] = [];
  const hasBids = bids.length > 0;
  // const bids = [
  //   {
  //     id: 1,
  //     amount: 100,
  //     userName: "Alice",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 200,
  //     userName: "Alice",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 3,
  //     amount: 300,
  //     userName: "Alice",
  //     timestamp: new Date(),
  //   },
  // ] as const;

  return (
    <main className="container mx-auto space-y-8 py-12">
      <div className="flex gap-8">
        {/* left side */}
        <div className="flex flex-col gap-6">
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
            <div></div>
            Starting Price of{" "}
            <span className="font-bold">
              {formatToDollar(item.startingPrice)}
            </span>
            <div></div>
            <div>
              Bid Interval{" "}
              <span className="font-bold">
                {formatToDollar(item.bidInterval)}
              </span>{" "}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 space-y-8">
          <h2 className="text-2xl font-semibold">Current Bids</h2>
          {hasBids ? (
            <ul className="space-y-4">
              {bids.map((bid) => (
                <li className="rounded-xl bg-gray-100 p-8" key={bid.id}>
                  <div>
                    <span className="font-bold">${bid.amount}</span> by{" "}
                    <span className="font-bold">{bid.userName}</span> at{" "}
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
                src={"/void.svg"}
                width={200}
                height={200}
                alt="Void - No Auctions found"
              />
              <h2 className="text-2xl font-bold">No Bids yet!</h2>
              <Button asChild>
                <Link href={"/"}>Bid it now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

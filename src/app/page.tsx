import { auth } from "@/auth";
import { database, pg } from "@/db/database";

import Image from "next/image";
import { getImageUrl } from "@/utils/files";
import { ItemCard } from "@/components/item-card";
import { pageTitleStyle } from "@/styles/style";

export default async function HomePage() {
  const session = await auth();
  // fetch all bids
  const allBids = await database.query.bids.findMany();
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
      <h1 className={pageTitleStyle}>Items For Sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}

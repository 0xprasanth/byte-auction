import { auth } from "@/auth";
import { database, pg } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmptyState from "./empty-state";
import { pageTitleStyle } from "@/styles/style";

export default async function MyAuctionPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  // fetch all bids

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
      <h1 className={pageTitleStyle}>Your Current Auctions</h1>
      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          <>
            {allItems.map((item) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </>
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}

// import { auth } from "@/auth";
import { database } from "@/db/database";
import { ItemCard } from "@/components/item-card";
import { pageTitleStyle } from "@/styles/style";

export default async function HomePage() {
  // const session = await auth();
  // fetch all bids
  // const allBids = await database.query.bids.findMany();
  const allItems = await database.query.items.findMany();
  const hasItems = allItems.length > 0;
  return (
    <main className="space-y-8">
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
      <h1 className={pageTitleStyle}>Items For Sale</h1>
      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl md:text-4xl">No Items Listed</h2>
      )}
    </main>
  );
}

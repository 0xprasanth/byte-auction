import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignIn from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import { database, pg } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const session = await auth();
  // fetch all bids
  const allBids = await database.query.bids.findMany();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto space-y-8 py-12">
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
      <h1 className="text-3xl font-bold">Items For Sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div className="rounded-xl border p-8" key={item.id}>
            {item.name}
            starting price: ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}

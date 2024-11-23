import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database, pg } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  // fetch all bids
  const allBids = await database.query.bids.findMany();
  return (
    <main className="container mx-auto py-12">
      {/* test form and connection with drizzle */}
      <form
        action={async (formData: FormData) => {
          "use server";
          const bid = formData.get("bid") as string;
          // SQL to create records
          await database.insert(bidsSchema).values({});
          // refresh page on page updates
          revalidatePath("/");
        }}
      >
        <Input
          name="bid"
          id="bid"
          placeholder="Bid"
          className="border border-slate-500"
        />
        <Button type="submit">Place bid</Button>
      </form>
      {allBids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}

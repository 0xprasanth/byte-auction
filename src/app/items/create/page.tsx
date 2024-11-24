import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database, pg } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createItemAction } from "./action";

export default async function CreateBidPage() {
  const session = await auth();
  // fetch all bids
  //   const allBids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto space-y-8 py-12">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        action={createItemAction}
        className="flex max-w-lg flex-col space-y-6 rounded-xl border p-8"
      >
        <Input
          className="max-w-md"
          name="name"
          id="name"
          required
          placeholder="Name your item"
        />
        <Input
          className="max-w-md"
          name="startingPrice"
          id="startingPrice"
          type="number"
          step={"0.01"}
          required
          placeholder="What to start your auction at"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
    </main>
  );
}

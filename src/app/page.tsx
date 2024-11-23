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
    <main className="container mx-auto py-12">
      {!session ? <SignIn /> : <SignOut />}
      {session ? session.user?.name : "login"}

      {/* test form and connection with drizzle */}
      <h1>Create Bid</h1>
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
      <div className="my-0 h-10 w-full"></div>

      <h1>Create Item</h1>
      <form
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          // SQL to create records
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          // refresh page on page updates
          revalidatePath("/");
        }}
      >
        <Input name="name" id="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}

      {session && allItems.map((item) => <div key={item.id}>{item.name}</div>)}
    </main>
  );
}

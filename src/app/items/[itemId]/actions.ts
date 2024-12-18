"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock(env.KNOCK_SECRET_KEY);

export async function createBidAction(itemId: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be logged in to place a bid");
  }
  // get an item
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  if (!item) {
    throw new Error("Item not found");
  }

  const latestBidValue = item.currentBid + item.bidInterval;
  // race condition
  // promise all
  await database // update latest bid
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: userId,
    timestamp: new Date(),
  });

  const currentBid = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  });

  const recipients: { id: string; name: string; email: string }[] = [];

  for (const bid of currentBid) {
    // loop through current bids list and get list of unique user ID's
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId,
        name: bid.user.name ?? "anonymous",
        email: bid.user.email ?? "",
      });
    }
  }

  // TODO: send notification to everyone else on this item who place their bid that some oneout bidded them
  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session.user.name ?? "anonymous",
        email: session.user.email ?? "",
      },
      recipients,
      data: {
        itemId,
        bidAmount: latestBidValue,
        itemName: item.name,
        // user: { image: session.user.image!, name: session.user.name! },
      },
    });
  }

  revalidatePath(`/items/${itemId}`);
}

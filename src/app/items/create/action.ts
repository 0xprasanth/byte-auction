"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  const startingPrice = parseFloat(formData.get("startingPrice") as string);
  const priceAsCents = Math.floor(startingPrice * 100);
  // SQL to create records
  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: priceAsCents,
    userId: user.id,
  });
  // refresh page on page updates
  revalidatePath("/");
  redirect("/");
}

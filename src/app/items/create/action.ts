"use server";
import axios from "axios";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearConfigCache } from "prettier";
import { env } from "@/env";

type createItemActionType = {
  fileName: string;
  name: string;
  startingPrice: number;
};

export async function createItemAction({
  fileName,
  name,
  startingPrice,
}: createItemActionType) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  const priceAsCents = Math.floor(startingPrice * 100);
  // console.log(formData);

  // SQL to create records
  await database.insert(items).values({
    name: name,
    startingPrice: priceAsCents,
    userId: user.id,
    fileKey: fileName,
  });
  // // refresh page on page updates
  // revalidatePath("/");
  // redirect("/");
}

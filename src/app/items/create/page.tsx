"use client";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database, pg } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createItemAction } from "./action";
import axios from "axios";

export default function CreateBidPage() {
  // fetch all bids
  //   const allBids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto space-y-8 py-12">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          const { data: imageUpload } = await axios.post(
            `/api/upload`,
            uploadFormData,
          );

          await createItemAction({
            name: formData.get("name") as string,
            startingPrice: Math.floor(
              Number(formData.get("startingPrice")) * 100,
            ),
            fileName: imageUpload.fileName ?? "",
          });
        }}
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
        <Input
          className="max-w-md"
          name="file"
          id="file"
          type="file"
          required
          placeholder="Upload image of the item"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
      {/* {session && allBids.map((bid) => <div key={bid.id}>{bid.id}</div>)} */}
    </main>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./action";
import axios from "axios";
import { pageTitleStyle } from "@/styles/style";
import { type UploadResponseType } from "@/types/AxiosResponse";

export default function CreateBidPage() {
  // fetch all bids
  //   const allBids = await database.query.bids.findMany();

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyle}>Post an Item</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadFormData = new FormData();

          uploadFormData.append("file", file);

          const { data: imageUpload } = await axios.post<UploadResponseType>(
            `/api/upload`,
            uploadFormData,
          );

          const price = Number(formData.get("startingPrice"));
          console.log("price", price);
          console.log("stPrice", formData.get("startingPrice"));

          await createItemAction({
            name: formData.get("name") as string,
            startingPrice: price,
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

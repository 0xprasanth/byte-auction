import { Button } from "@/components/ui/button";
import { emptyStateDiv } from "@/styles/style";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className={emptyStateDiv}>
      <Image
        src={"/void.svg"}
        width={200}
        height={200}
        alt="Void - No Auctions found"
      />
      <h2 className="text-2xl font-bold">You have no auctions yet</h2>
      <Button asChild>
        <Link href={"/items/create"}>Create Auction</Link>
      </Button>
    </div>
  );
}

export default EmptyState;

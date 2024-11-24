import { Item } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/utils/currency";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="space-y-2 rounded-xl border p-8">
      <Image
        alt={item.name}
        src={getImageUrl(item.fileKey)}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-lg">
        starting price: {formatToDollar(item.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Bid It</Link>
      </Button>
    </div>
  );
}

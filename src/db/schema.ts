import { pgTable, serial } from "drizzle-orm/pg-core";

/**
 * table definition for bids
 * ba_bids ==> byte auction bids
 */
export const bids = pgTable("ba_bids", {
  id: serial("id").primaryKey(),
});

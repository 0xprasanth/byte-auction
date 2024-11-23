import { env } from "@/env";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL);
  database = drizzle(pg, { schema });
} else {
  if (!global.database) {
    pg = postgres(env.DATABASE_URL);
    global.database = drizzle(pg, { schema });
  }
  database = global.database;
}

export { database, pg };
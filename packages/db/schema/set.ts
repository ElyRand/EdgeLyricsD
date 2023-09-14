import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const sets = sqliteTable("sets", {
  id: integer("id").primaryKey(),
});

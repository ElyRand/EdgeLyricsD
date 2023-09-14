import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: "https://current-the-phantom-elyrand.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ1NzA0NTYsImlkIjoiMzY1OTA3OTAtNTFkOS0xMWVlLWI4NGQtYTY4MWJiMGRiZTUxIn0.iiWcMZ3xeVfT134GFxGVABtbdJVkuHtPhFZXJIU_4l5EbVNe7hgPbDEKgue7lBZM4W12uUM9oSJpQFuYgSy7DQ",
});

async function main() {
  const db = drizzle(client);

  console.log("Running migrations");

  await migrate(db, { migrationsFolder: "migrations" });

  console.log("Migrated successfully");

  process.exit(0);
}

main().catch((e) => {
  console.error("Migration failed");
  console.error(e);
  process.exit(1);
});

import { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: "https://current-the-phantom-elyrand.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ1NzA0NTYsImlkIjoiMzY1OTA3OTAtNTFkOS0xMWVlLWI4NGQtYTY4MWJiMGRiZTUxIn0.iiWcMZ3xeVfT134GFxGVABtbdJVkuHtPhFZXJIU_4l5EbVNe7hgPbDEKgue7lBZM4W12uUM9oSJpQFuYgSy7DQ",
  },
} satisfies Config;

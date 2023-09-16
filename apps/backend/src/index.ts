import { Hono } from "hono";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { songs } from "./db/schema/song";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { cors } from "hono/cors";

const client = createClient({
  url: "https://current-the-phantom-elyrand.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ1NzA0NTYsImlkIjoiMzY1OTA3OTAtNTFkOS0xMWVlLWI4NGQtYTY4MWJiMGRiZTUxIn0.iiWcMZ3xeVfT134GFxGVABtbdJVkuHtPhFZXJIU_4l5EbVNe7hgPbDEKgue7lBZM4W12uUM9oSJpQFuYgSy7DQ",
});
const db = drizzle(client);

const app = new Hono().use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["*"],
  })
);

const songsRoute = app
  .get("/songs", async (c) => {
    const data = await db.select().from(songs).all();

    return c.jsonT({ data });
  })
  .post(
    "/songs",
    zValidator("json", z.object({ title: z.string(), lyrics: z.string() })),
    async (c) => {
      const body = c.req.valid("json");
      try {
        const adding = await db.insert(songs).values(body);
        c.status(204);
        return c.text("Added", adding.rowsAffected);
      } catch (e) {
        c.status(200);
        return c.jsonT(e);
      }
    }
  )
  .get(
    "/songs/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const idParam = c.req.valid("param").id;
      const id = parseInt(idParam);
      const [song] = await db.select().from(songs).where(eq(songs.id, id));

      if (song) {
        return c.jsonT(song);
      } else {
        return c.text("not found", 404);
      }
    }
  )
  .delete(
    "/songs/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const id = c.req.valid("param").id;
      try {
        const deleted = await db
          .delete(songs)
          .where(eq(songs.id, parseInt(id)))
          .returning();
        c.status(200);
        return c.jsonT({ deleted });
      } catch (e) {
        c.status(400);
        return c.jsonT({ message: "not deleted" });
      }
    }
  )
  .options("*", (c) => {
    return new Response(null, { status: 204 });
  });
export default app;

export type AppType = typeof songsRoute;

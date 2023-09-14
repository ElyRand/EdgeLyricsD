import { InferSelectModel } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const songs = sqliteTable(
  "songs",
  {
    id: integer("id").primaryKey(),
    title: text("title"),
    lyrics: text("lyrics"),
  },
  (songs) => ({
    titleIdx: index("titleIdx").on(songs.title),
  })
);

export type SelectSong = InferSelectModel<typeof songs>;

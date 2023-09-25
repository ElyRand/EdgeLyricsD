"use server";
import client from "@lib/honoClient";
import { revalidatePath } from "next/cache";

const deleteSong = async (songId: string) => {
  if (!songId) throw new Error("Missing song Id");
  await client.songs[":id"].$delete({ param: { id: songId } });
  revalidatePath("/songs");
};

export default deleteSong;

"use server";
import client from "@lib/honoClient";
import { revalidatePath } from "next/cache";

const deleteSong = async (data: FormData) => {
  const songId = data.get("id")?.toString();
  console.log("yo from server");
  if (!songId) throw new Error("Missing song Id");
  await client.songs[":id"].$delete({ param: { id: songId } });
  revalidatePath("/songs");
};

export default deleteSong;

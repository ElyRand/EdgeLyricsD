import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import client from "../../../../utils/honoClient";

const schema = z.object({
  title: z.string(),
  lyrics: z.string(),
});

export default function AddPage() {
  async function create(formData: FormData) {
    "use server";
    console.log(formData);
    const parsed = schema.parse({
      title: formData.get("title"),
      lyrics: formData.get("lyrics"),
    });
    const create = client.songs.$post({ json: parsed });
    return (await create).json();
  }

  return (
    <div>
      <h1>AddPage</h1>
      <form action={create} className="border flex flex-col ">
        <label htmlFor="title">Title</label>
        <input className="text-black" id="title" name="title" />
        <label htmlFor="lyrics">Lyrics</label>
        <textarea className="text-black" id="lyrics" name="lyrics" />
        <button>Submit </button>
      </form>
    </div>
  );
}

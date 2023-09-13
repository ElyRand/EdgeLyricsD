import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

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
    const req = await fetch("https://my-app.elyeser-f.workers.dev/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    });

    if (req.ok) {
      revalidatePath("/songs");
      redirect("/songs");
    } else {
      console.error(await req.json());
    }
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

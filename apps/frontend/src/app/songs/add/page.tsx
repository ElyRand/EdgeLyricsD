import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import client from "../../../../lib/honoClient";
import { Textarea } from "@/components/TextArea";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    if (!parsed.lyrics) throw new Error("NO Lyrics");
    if (!parsed.title) throw new Error("NO Title");
    await client.songs.$post({ json: parsed });
    revalidatePath("/songs");
    redirect("/songs");
  }

  return (
    <div>
      <div className="">
        <Link href="/songs" className="flex items-center">
          <ArrowLeft size={25} strokeWidth={3} />
          Retour aux chants
        </Link>
      </div>
      <h1 className="text-center text-4xl">Nouveau chant</h1>
      <form action={create} className="flex flex-col mx-10 my-5">
        <Label htmlFor="title" className="text-2xl">
          Title
        </Label>
        <Input className="text-black mt-5" id="title" name="title" />
        <Label htmlFor="lyrics" className="my-5 text-2xl">
          Lyrics
        </Label>
        <Textarea className="text-black " id="lyrics" name="lyrics" />
        <div>
          <Button className="mt-8 text-2xl p-5 bg-green-500">Submit </Button>
        </div>
      </form>
    </div>
  );
}

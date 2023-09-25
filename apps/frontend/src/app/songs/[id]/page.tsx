import Link from "next/link";
import client from "../../../../lib/honoClient";
import { ArrowLeft } from "lucide-react";

const getSong = async (id: string) => {
  const result = await client.songs[":id"].$get({ param: { id } });
  const data = await result.json();
  return data;
};
export default async function Page({ params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  return (
    <div>
      <Link href="/songs" className="flex items-center">
        <ArrowLeft size={25} strokeWidth={3} />
        Retour aux chants
      </Link>
      <main className="w-full h-full flex flex-col justify-center items-center ">
        <div>
          <h2 className="text-3xl capitalize mb-10 text-center">
            {song.title}
          </h2>
          <pre>{song.lyrics}</pre>
        </div>
      </main>
    </div>
  );
}

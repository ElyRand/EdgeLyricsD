import Link from "next/link";
import client from "../../../lib/honoClient";
import DeleteButton from "./components/DeleteButton";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";

async function getData() {
  return (await client.songs.$get()).json();
}

export default async function Page() {
  const { data } = await getData();
  return (
    <main className="px-10">
      <div className="flex gap-x-10">
        <h1 className="text-5xl mb-10">Liste des chants</h1>
        <Link href="/songs/add">
          <Button className="bg-transparent rounded-full mt-1">
            <Plus size={48} strokeWidth={3} />
          </Button>
        </Link>
      </div>

      <ul>
        {data?.map((song: any) => (
          <li key={song.id} className="flex items-center">
            <Link href={"/songs/" + song.id}>
              <span>
                {song.id} - {song.title}
              </span>
            </Link>
            <DeleteButton songId={song.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}

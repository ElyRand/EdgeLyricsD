import Link from "next/link";
import client from "../../../utils/honoClient";
import DeleteButton from "./components/DeleteButton";

async function getData() {
  return (await client.songs.$get()).json();
}

export default async function Page() {
  const { data } = await getData();
  return (
    <main className="px-10">
      <div className="flex gap-x-10">
        <h1>Song list</h1>
        <Link href="/songs/add">
          <button>+</button>
        </Link>
      </div>

      <ul>
        {data?.map((song: any) => (
          <li key={song.id}>
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

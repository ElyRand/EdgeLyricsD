import Link from "next/link";

async function getData() {
  const res = await fetch("https://my-app.elyeser-f.workers.dev/songs");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const { data } = await getData();
  console.log(data);
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
            {song.id} - {song.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

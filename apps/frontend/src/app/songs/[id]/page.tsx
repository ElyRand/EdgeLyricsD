import Link from "next/link";
import client from "../../../../lib/honoClient";

const getSong = async (id: string) => {
  const result = await client.songs[":id"].$get({ param: { id } });
  const data = await result.json();
  return data;
};
export default async function Page({ params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  return (
    <div>
      <Link href="/songs">Back To Songs</Link>
      <main>The song: {params.id}</main>
      <h2>{song.title}</h2>
      <pre>{song.lyrics}</pre>
    </div>
  );
}

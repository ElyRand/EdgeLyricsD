import Link from "next/link";
import type { AppType } from "backend";
import { hc, InferResponseType, InferRequestType } from "hono/client";

const client = hc<AppType>("https://my-app.elyeser-f.workers.dev");
const getSong = async (id: string) => {
  // const req = await fetch("https://my-app.elyeser-f.workers.dev/songs/" + id);
  // if (req.ok) {
  //   const song = (await req.json()) as AppType;
  // }
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

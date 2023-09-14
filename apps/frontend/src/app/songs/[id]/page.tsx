import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Link href="/songs">Back To Songs</Link>
      <main>The song: {params.id}</main>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Link href="/songs">
        <button className="px-5 py-3 border ">Songs</button>
      </Link>
    </main>
  );
}

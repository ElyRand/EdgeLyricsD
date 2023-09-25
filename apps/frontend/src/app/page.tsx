import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Link href="/songs">
        <Button>Songs</Button>
      </Link>
    </main>
  );
}

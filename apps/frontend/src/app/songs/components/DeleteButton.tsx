"use client";

import { revalidatePath } from "next/cache";
import client from "../../../../lib/honoClient";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import deleteSong from "@components/actions/deleteSong";
import { useTransition } from "react";
interface DeleteButtonProps {
  songId: string;
}
const DeleteButton = ({ songId }: DeleteButtonProps) => {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        console.log("HEERE");
        const data = new FormData();
        data.set("id", songId);
        // await startTransition(async () => {
        await deleteSong(data);
        // });
      }}
      className="text-red-200 bg-transparent"
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;

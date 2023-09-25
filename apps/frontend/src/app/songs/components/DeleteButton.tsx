"use client";

import { revalidatePath } from "next/cache";
import client from "../../../../lib/honoClient";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
interface DeleteButtonProps {
  songId: string;
}
const DeleteButton = ({ songId }: DeleteButtonProps) => {
  return (
    <Button
      className="text-red-200 bg-transparent"
      onClick={async () => {
        await client.songs[":id"].$delete({ param: { id: songId } });
      }}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;

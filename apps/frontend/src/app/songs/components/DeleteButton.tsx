"use client";

import { revalidatePath } from "next/cache";
import client from "../../../../utils/honoClient";

interface DeleteButtonProps {
  songId: string;
}
const DeleteButton = ({ songId }: DeleteButtonProps) => {
  return (
    <button
      className="border"
      onClick={async () => {
        await client.songs[":id"].$delete({ param: { id: songId } });
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;

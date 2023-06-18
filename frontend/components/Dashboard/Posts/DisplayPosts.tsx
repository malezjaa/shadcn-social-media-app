import { axiosClient } from "@/lib/api/axios";
import { Post } from ".prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { columns } from "@/components/ui/datatable/columns";
import { DataTable } from "@/components/ui/datatable/data-table";
export default async function DisplayPosts() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: session?.user.id,
    },
  });

  return (
    <>
      <div className={"my-3 flex w-full"}>
        {/*@ts-ignore*/}
        <DataTable columns={columns} data={posts} />
      </div>
    </>
  );
}

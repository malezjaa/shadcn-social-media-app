import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; published: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const updatedPost = await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        published: params.published === "true",
      },
    });

    return new Response(JSON.stringify(updatedPost));
  } catch (err) {
    console.log(err);
    return new Response("Could not change visibility. Please try later", {
      status: 500,
    });
  }
}

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.post.delete({
      where: {
        id: params.id as string,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);

    return new Response("Could not delete posts. Please try later", {
      status: 500,
    });
  }
}

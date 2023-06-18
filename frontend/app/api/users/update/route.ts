import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    console.log(body);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const updatedPost = await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        bio: body.bio,
        username: body.username,
        websites: {
          create: body.urls.map((website: any) => {
            return { url: website.value };
          }),
        },
      },
    });

    return new Response(JSON.stringify(updatedPost));
  } catch (err) {
    console.log(err);
    return new Response("Could not update profile. Please try later", {
      status: 500,
    });
  }
}

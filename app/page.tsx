import { FaAddressBook } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const user = await getServerSession(authOptions);
  if (!user)
    return (
      <div>
        <Navbar />
        <div className={"divider my-0"}></div>
        <main className="flex justify-between p-5 sm:p-16 text-black w-full h-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div className={"flex flex-col bg-center items-center h-[400px]"}>
              <h1
                className={
                  "font-extrabold text-[3rem] sm:text-[4rem] text-center"
                }
              >
                Prise
              </h1>
              <p className={"text-center"}>
                Fast and secure something made in Next.js and Tailwind.
              </p>
              <div className={"mt-5"}>
                <Link href={"/sign-in"}>
                  <Button>Try it out!</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
  });

  return (
    <>
      <Navbar />
      <div className={"divider my-0"}></div>

      <div className="w-full h-screen flex justify-center">
        <main className="flex justify-center gap-6 flex-row p-5 sm:p-16 text-black h-full w-[70%]">
          <div>
            {posts?.map(async (e) => {
              const author = await db.user.findFirst({
                where: {
                  id: e.authorId,
                },
              });

              return (
                <Card className="w-[350px] mb-4" key={e.id}>
                  <CardHeader>
                    <CardTitle>{e.title}</CardTitle>
                    <CardDescription>
                      {moment(e.createdAt).format("DD.MM.YYYY")} •{" "}
                      {author?.username ? (
                        <Link
                          href={`/profiles/${author?.username}`}
                          className={"text-blue-500"}
                        >
                          {author?.username}
                        </Link>
                      ) : (
                        author?.name
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={"line-clamp-4 pt-0"}>
                    {e.content}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/posts/${e.id}`}>
                      <Button>View</Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import moment from "moment/moment";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Metadata, ResolvingMetadata} from "next";


type Props = {
  params: { username: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) return notFound();

  return {
    title: user.username ? user.username : user.name,
    openGraph: {
      images: [user.image as string],
    },
  }
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) return notFound();

  const websites = await db.website.findMany({
    where: {
      authorId: user.id,
    },
  });

  const usersPosts = await db.post.findMany({
    where: {
      authorId: user.id,
      published: true,
    },
  });

  return (
    <>
      <Navbar />
      <div className={"divider my-0"}></div>

      <div className="w-full h-screen flex justify-center">
        <main className="flex items-center w-[90%] md:w-[70%] gap-6 flex-col p-5 sm:p-16 text-black h-full">
          <Image
            src={user.image as string}
            alt={"image"}
            className={"w-[5rem] h-[5rem] rounded-full"}
            width={100}
            height={100}
          />
          <div className={"flex flex-col items-center"}>
            <h1 className={"font-bold text-3xl"}>
              {user.username && user.name}
            </h1>
            <h2 className={"font-bold text-3xl mt-0"}>
              {user.username ? user.username : user.name}
            </h2>
            <p>{user?.bio}</p>
          </div>
          <ul>
            {websites.map((website) => (
              <Link href={website.url} key={website.id} target={"_blank"}>
                <li>{website.url}</li>
              </Link>
            ))}
          </ul>
          {usersPosts?.map(async (e) => {
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
                    {author?.username ? author?.username : author?.name}
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
        </main>
      </div>
    </>
  );
}

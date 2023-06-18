import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import moment from "moment/moment";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {Metadata, ResolvingMetadata} from "next";

type Props = {
  params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.content,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!post) return notFound();

  const author = await db.user.findFirst({
    where: {
      id: post.authorId,
    },
  });

  return (
    <>
      <Navbar />
      <div className={"divider my-0"}></div>

      <div className="w-full h-screen flex justify-center items-center">
        <main className="flex justify-start w-[90%] md:w-[70%] gap-6 flex-col p-5 sm:p-16 text-black h-full">
          <div className={"flex flex-col"}>
            <h1 className={"font-bold text-4xl text-black"}>{post.title}</h1>
            <div className={"flex flex-row items-center mt-1"}>
              <Image
                src={author?.image as string}
                width={100}
                height={100}
                className={"w-7 h-7 rounded-full"}
                alt={"image"}
              />{" "}
              <h3 className={"ml-2"}>
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
              </h3>
            </div>
            <h4 className={"mt-1"}>
              Posted on {moment(post.createdAt).format("DD.MM.YYYY")}
            </h4>
          </div>
          <p>{post.content}</p>
        </main>
      </div>
    </>
  );
}

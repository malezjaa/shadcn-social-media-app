import AddPost from "@/components/Dashboard/Posts/AddPost";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import DisplayPosts from "@/components/Dashboard/Posts/DisplayPosts";
import {Metadata} from "next";

export const metadata:  Metadata =  {
    title: "Posts",
    description: "Your posts",
}

export default function page() {
    return (
      <>
        <Link href={"/dashboard/posts/create"}>
          <Button>
            Create Post
          </Button>
        </Link>

        {/* @ts-ignore */}
        <DisplayPosts/>
      </>
  );
}

import AddPost from "@/components/Dashboard/Posts/AddPost";
import {Metadata} from "next";

export const metadata:  Metadata =  {
    title: "Create new post",
    description: "Create new post",
}

export default function Page() {
  return (
    <div className={"flex items-center p-2"}>
      <AddPost />
    </div>
  );
}

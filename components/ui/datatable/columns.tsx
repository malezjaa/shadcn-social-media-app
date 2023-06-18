"use client"

import { ColumnDef } from "@tanstack/react-table"
import {User} from "next-auth";
import moment from "moment";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {axiosClient} from "@/lib/api/axios";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {toast} from "@/components/ui/toast";

export type Post = {
    id: string
    author: User
    published: boolean
    title: string
    createdAt: string
}

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("title")}</div>
        },
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("published") ? "Public" : "Private"}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            return <div className="font-medium">{moment(row.getValue("createdAt")).format("DD.MM.YYYY")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const post = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(post.id)}
                        >
                            Copy post ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild className={"w-full flex justify-center items-center"}>
                                <Button>
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        post.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={async() => {
                                        const response = await axiosClient.delete(`/posts/${post.id}`)

                                        if (response.status === 200) {
                                            toast({
                                                title: "Post deleted",
                                                message: "Your post has been deleted.",
                                                type: "success",
                                            })

                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 3000)
                                        }
                                    }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild className={"w-full flex justify-center items-center mt-2"}>
                                <Button>
                                    Change visibility
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You can change this later in the settings.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={async() => {
                                        const response = await axiosClient.patch(`/posts/visibility/${post.id}/${!post.published}`)

                                        if (response.status === 200) {
                                            toast({
                                                title: `Your post is now ${response.data.published ? "public.": "private."}`,
                                                message: "Visibility of your post has been changed.",
                                                type: "success",
                                            })

                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 3000)
                                        }
                                    }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

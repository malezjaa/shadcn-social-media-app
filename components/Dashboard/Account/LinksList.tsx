"use client";

import Link from "next/link";
import { SidebarOption } from "@/types/typings";

export default function LinksList({
  sidebarOptions,
}: {
  sidebarOptions: SidebarOption[];
}) {
  return (
    <div>
      {sidebarOptions.map((option) => (
        <Link
          href={option.href}
          key={option.id}
          className="text-gray-700 hover:text-gray-800 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold transition-color items-center flex-row ease-in-out duration-300"
        >
          <span className="truncate">{option.name}</span>
        </Link>
      ))}
    </div>
  );
}

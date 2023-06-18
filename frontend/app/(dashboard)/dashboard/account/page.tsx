import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AccountSettings from "@/components/AccountSettings/AccountSettings";
import {Metadata} from "next";

export const metadata:  Metadata =  {
  title: "Settings",
  description: "Your settings",
}

const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <AccountSettings />
      </div>
    </>
  );
};

export default page;

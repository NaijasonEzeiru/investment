"use client";

// import { getUsers } from "@/actions/actions";
import { Card } from "@/components/ui/card";
import type { User } from "@/db/schema/schema";
import { User as LucideUser, UserPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log({ data });
      if (res.ok) {
        setUsers(data);
      } else {
        toast.error("Unable to get users", {
          description: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Unable to get users", {
        description: "Something went wrong",
      });
      console.log({ error });
    }
  };

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-8">All users</h1>
      <div className="flex gap-6 flex-wrap">
        {Array.isArray(users) &&
          users &&
          users?.map((user) => (
            <Card className="px-4 py-4 grow" key={user.id}>
              <div className="space-y-4 w-full">
                <div className="flex sm:gap-7 items-center justify-between flex-col sm:flex-row">
                  <div className="flex gap-2 items-center self-start">
                    <LucideUser
                      size={30}
                      className="border-4 bg-border border-border rounded-full size-11"
                    />
                    <div className="">
                      <p className="text-xl font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-base">{user.role}</p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="inline-flex items-center self-end justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-4 text-lg"
                  >
                    <UserPen />
                    Edit
                  </Link>
                </div>
                <hr />
                <div className="">
                  <span className="flex">
                    <p className="w-20">Username:</p>
                    <p className="font-medium">{user.username}</p>
                  </span>
                  <span className="flex">
                    <p className="w-20">Level:</p>
                    <p className="font-medium">VIP{user.level}</p>
                  </span>
                  <span className="flex">
                    <p className="w-20">Phone No:</p>
                    <p className="font-medium">{user.phone}</p>
                  </span>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}

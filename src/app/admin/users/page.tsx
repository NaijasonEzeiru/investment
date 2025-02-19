import { getUsers } from "@/actions/actions";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, UserPen } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const users = await getUsers();
  console.log({ users });

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-8">All users</h1>
      <div className="">
        {Array.isArray(users) &&
          users?.map((user) => (
            <Card
              className="px-4 py-4 w-fit flex justify-between gap-14"
              key={user.id}
            >
              <div className="">
                <User className="size-28 rounded-full bg-slate-200 border-border border-8 border-gray-200" />
                <p className="mt-3 mb-1">Progress</p>
                <Progress value={50} />
              </div>
              <div className="space-y-4">
                <div className="flex gap-7 items-center justify-between">
                  <div className="">
                    <p className="text-2xl font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-base">{user.role}</p>
                  </div>
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-4 text-lg"
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

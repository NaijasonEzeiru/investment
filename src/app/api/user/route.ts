import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await db.select().from(users);
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "No user found",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

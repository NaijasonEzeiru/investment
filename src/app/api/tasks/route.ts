import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log({ body });
    await db
      .update(users)
      .set({
        balance: sql`${users.balance} - 30`,
        completedTasks: sql`${users.completedTasks} + 1`,
        interest: sql`${users.interest} + 45`,
      })
      .returning();
    return new NextResponse(
      JSON.stringify({
        message: "Order submitted successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    // const err = error as { code?: string; constraint?: string };
    console.log({ error });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};

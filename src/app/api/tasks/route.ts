import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq, sql } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log({ body });
    if (body?.upgrade) {
      const [user] = await db
        .update(users)
        .set({
          balance: body.b,
          completedTasks: 0,
          interest: sql`${users.interest} + 45`,
          reviewed: [],
          level: sql`${users.level} + 1`,
        })
        .where(eq(users.id, body.userId))
        .returning();
      return new NextResponse(
        JSON.stringify({
          message: `Congrats, you have now been upgraded to VIP${user.level}`,
        }),
        { status: 201 }
      );
    }
    await db
      .update(users)
      .set({
        balance: sql`${users.balance} - 30`,
        completedTasks: sql`${users.completedTasks} + 1`,
        interest: sql`${users.interest} + 45`,
        reviewed: sql`array_append(${users.reviewed}, ${body.id})`,
      })
      .where(eq(users.id, body.userId))
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

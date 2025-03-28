import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { EditUserSchemaRoute } from "@/lib/zodSchema";
import { eq } from "drizzle-orm";

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

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log({ edit: body });
    const validate = EditUserSchemaRoute.safeParse(body);
    if (validate?.error) {
      return new NextResponse(
        JSON.stringify({
          errors: validate.error.errors,
        }),
        { status: 400 }
      );
    }
    await db
      .update(users)
      .set({ ...validate.data })
      .where(eq(users.id, body.id))
      .returning();
    return new NextResponse(
      JSON.stringify({
        message: "user modified successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    const err = error as { code?: string; constraint?: string };
    if (err?.code === "23505") {
      return new NextResponse(
        JSON.stringify({
          errors: [
            {
              path: err.constraint?.split("_")[1],
              message: `A user with this ${
                err.constraint?.split("_")[1]
              } already exists`,
            },
          ],
        }),
        { status: 409 }
      );
    }
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};

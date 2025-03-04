import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { EditProfileSchema } from "@/lib/zodSchema";
import { eq } from "drizzle-orm";

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  try {
    const body = await request.json();
    const validate = EditProfileSchema.safeParse(body);
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
      .where(eq(users.id, id));
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

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  try {
    const body = await request.json();
    console.log({ body });
    await db
      .update(users)
      .set({ ...body })
      .where(eq(users.id, id));
    return new NextResponse(
      JSON.stringify({
        message: "Address added successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};

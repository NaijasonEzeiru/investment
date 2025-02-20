import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db";
import { listings } from "@/db/schema/schema";
// import { HotelSchema } from "@/lib/zodSchema";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    // const validate = HotelSchema.safeParse(body);
    // if (validate?.error) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       errors: validate.error.errors,
    //     }),
    //     { status: 400 }
    //   );
    // }
    const [listing] = await db
      .insert(listings)
      .values({
        ...body,
      })
      .returning();
    return new NextResponse(
      JSON.stringify({
        message: `${listing.title} (${listing.type}) added successfully`,
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

export async function GET(request: NextRequest) {
  try {
    const len = request.nextUrl.searchParams.get("len") || 30;
    const l = await db.select().from(listings).limit(+len);
    if (!l) {
      return new NextResponse(
        JSON.stringify({
          message: "No listing found",
        }),
        { status: 404 }
      );
    }
    console.log({ l });
    return new NextResponse(
      JSON.stringify({
        l,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}

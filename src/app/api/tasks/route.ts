import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log({ body });
    const [user] = await db.update(users).set({}).returning();
    return new NextResponse(
      JSON.stringify({
        message: `${user.firstName} ${user.lastName} updated successfully`,
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

export async function GET() {
  try {
    const listings = await db.query.hotels.findMany();
    if (!listings) {
      return new NextResponse(
        JSON.stringify({
          message: "No listing found",
        }),
        { status: 404 }
      );
    }
    console.log({ listings });
    return new NextResponse(
      JSON.stringify({
        listings,
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

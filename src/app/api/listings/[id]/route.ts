import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { listings } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const [listing] = await db
      .select()
      .from(listings)
      .where(eq(listings.id, id));
    if (!listing) {
      return { message: "No user found", status: 404 };
    }
    return new NextResponse(
      JSON.stringify({
        listing,
      }),
      { status: 201 }
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

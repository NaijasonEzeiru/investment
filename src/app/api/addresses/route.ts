import { db } from "@/db/db";
import { cryptoPayments } from "@/db/schema/schema";
import { AddressesSchema } from "@/lib/zodSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const addresses = await db.select().from(cryptoPayments);
    if (!addresses) {
      return new NextResponse(
        JSON.stringify({
          message: "No address found",
        }),
        { status: 404 }
      );
    }
    console.log({ addresses });
    return new NextResponse(
      JSON.stringify({
        addresses,
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

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validate = AddressesSchema.safeParse(body);
    if (validate?.error) {
      return new NextResponse(
        JSON.stringify({
          errors: validate.error.errors,
        }),
        { status: 400 }
      );
    }
    const [address] = await db
      .insert(cryptoPayments)
      .values({
        ...validate.data,
      })
      .returning();
    return new NextResponse(
      JSON.stringify({
        message: `${address.coin} address added successfully`,
      }),
      { status: 201 }
    );
  } catch (error) {
    const err = error as { code?: string; constraint?: string; detail: string };
    if (err?.code == "23505") {
      return new NextResponse(
        JSON.stringify({
          error: err.detail,
        }),
        { status: 409 }
      );
    }
    console.log({ error });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};

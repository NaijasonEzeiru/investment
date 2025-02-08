import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { RegisterSchema } from "@/lib/zodSchema";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validate = RegisterSchema.safeParse(body);
    if (validate?.error) {
      return new NextResponse(
        JSON.stringify({
          errors: validate.error.errors,
        }),
        { status: 400 }
      );
    }
    const {
      password,
      firstName,
      lastName,
      email,
      phone,
      referralCode,
      transferPin,
      username,
    } = validate.data;
    const [register] = await db
      .insert(users)
      .values({
        passwordHash: CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET!
        ).toString(),
        email: email.toLowerCase(),
        firstName: firstName.replace(/^./, (char) => char.toUpperCase()),
        lastName: lastName.replace(/^./, (char) => char.toUpperCase()),
        phone,
        referralCode,
        transferPin,
        username,
      })
      .returning();
    return new NextResponse(
      JSON.stringify({
        message: `${register.firstName} ${register.lastName} registered successfully`,
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

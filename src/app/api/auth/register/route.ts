import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { RegisterSchemaRoute } from "@/lib/zodSchema";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validate = RegisterSchemaRoute.safeParse(body);
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
      transferPin,
      username,
      referralCode,
    } = validate.data;
    let balance = 0;
    let ref: undefined | number = undefined;
    if (referralCode) {
      balance = 800;
      ref = +referralCode - 1070050000;
    }
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
        transferPin,
        username,
        balance: balance.toString(),
        upline: ref,
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
    if (err?.code == "23503") {
      return new NextResponse(
        JSON.stringify({
          errors: [
            {
              path: "referralCode",
              message: "Invalid referral code",
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

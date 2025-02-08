import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { eq, or } from "drizzle-orm";

import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { signJwt, verifyJWT } from "@/lib/checkToken";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const [user] = await db
      .select()
      .from(users)
      .where(
        or(eq(users.email, email.toLowerCase()), eq(users.username, email))
      )
      .limit(1);
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid credentials",
        }),
        { status: 401 }
      );
    }
    const { passwordHash, ...rest } = user;
    const unhashedPassword = CryptoJS.AES.decrypt(
      passwordHash,
      process.env.PASSWORD_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    if (password !== unhashedPassword) {
      return new NextResponse(
        JSON.stringify({
          message: "Incorrect password. Try again",
        }),
        { status: 401 }
      );
    }
    const accessToken = await signJwt({ id: rest.id, role: rest.role });
    const response = NextResponse.json(
      {
        ...rest,
        jwt: accessToken,
        Message: "logged in successfully",
      },
      { status: 201 }
    );
    return response;
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("access_token")?.value;
  if (token) {
    const { id } = await verifyJWT(token);
    if (!id) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "invalid token",
        }),
        { status: 401 }
      );
    }
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id as string));
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            message: "Invalid credentials",
          }),
          { status: 401 }
        );
      }
      const { passwordHash, ...rest } = user;
      // TODO: remove later
      console.log({ passwordHash });
      const accessToken = await signJwt({
        id: user.id,
        role: user.role,
      });
      const response = NextResponse.json(
        {
          user: rest,
          Message: "logged in successfully",
        },
        { status: 201 }
      );
      response.cookies.set({
        name: "access_token",
        value: accessToken,
        httpOnly: true,
        path: "/",
      });
      return response;
    } catch (err) {
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error! Token was not provided",
      }),
      { status: 401 }
    );
  }
};

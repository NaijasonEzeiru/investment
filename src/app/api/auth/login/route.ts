import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { signJwt, verifyJWT } from "@/lib/checkToken";

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
      const referralCode = user.serial + 1070050000;
      const { passwordHash, ...rest } = user;
      rest.upline = referralCode;
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

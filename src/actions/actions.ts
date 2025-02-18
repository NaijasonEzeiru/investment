"use server";
import { eq, or } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CryptoJS from "crypto-js";

import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { signJwt } from "@/lib/checkToken";

export async function login(
  prevState: {
    message: string;
    code: number;
  } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password");
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(
        or(eq(users.email, email.toLowerCase()), eq(users.username, email))
      )
      .limit(1);
    if (!user) {
      return { message: "Invalid credentials", code: 401 };
    }
    const { passwordHash, ...rest } = user;
    const unhashedPassword = CryptoJS.AES.decrypt(
      passwordHash,
      process.env.PASSWORD_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    if (password !== unhashedPassword) {
      return { message: "Invalid credentials", code: 401 };
    }
    const accessToken = await signJwt({ id: rest.id, role: rest.role });
    (await cookies()).set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      path: "/",
    });
    return {
      message: `Log in successful - Welcome ${rest.firstName} ${rest.lastName}`,
      data: rest,
      code: 200,
    };
    // redirect("/");
  } catch (err) {
    if (isRedirectError(err)) {
      redirect("/");
    }
    console.log(err);
    return { message: "Something went wrong", code: 500 };
  }
}

export async function getListings() {
  try {
    const listings = await db.query.listings.findMany();
    if (!listings) {
      return { message: "No listing found", status: 404 };
    }
    console.log({ listings });
    return listings;
  } catch (err) {
    console.log({ err });
    return { message: "Something went wrong", status: 500 };
  }
}

export async function getUsers() {
  try {
    const users = await db.query.users.findMany();
    if (!users) {
      return { message: "No user found", status: 404 };
    }
    console.log({ users });
    return users;
  } catch (err) {
    console.log({ err });
    return { message: "Something went wrong", status: 500 };
  }
}

export async function getUser(id: string) {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) {
      return { message: "No user found", status: 404 };
    }
    // @typescript-eslint/no-unused-vars
    const { passwordHash, ...rest } = user;
    console.log({ user, passwordHash });
    return rest;
  } catch (err) {
    console.log({ err });
    return { message: "Something went wrong", status: 500 };
  }
}

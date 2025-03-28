"use server";
import { count, eq, or } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CryptoJS from "crypto-js";

import { db } from "@/db/db";
import { listings, users } from "@/db/schema/schema";
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
    console.log({ user });
    if (!user) {
      return { message: "Invalid credentials", code: 401 };
    }
    const referralCode = user.serial + 1070050000;
    const { passwordHash, ...rest } = user;
    rest.upline = referralCode;
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

export async function getListings(limit = 8, offset = 1) {
  try {
    const l = await db
      .select()
      .from(listings)
      .offset(offset - 1)
      .limit(limit);
    const [totalCount] = await db.select({ count: count() }).from(listings);
    const totalPages = Math.ceil(totalCount.count / limit);
    if (!l) {
      return { message: "No listing found", status: 404 };
    }
    console.log({ totalCount });
    return { listings: l, totalPages };
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
    console.log({ action: user });
    if (!user) {
      return { message: "No user found", status: 404 };
    }
    const unhashedPassword = CryptoJS.AES.decrypt(
      user.passwordHash,
      process.env.PASSWORD_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    const newUser = { ...user, password: unhashedPassword };
    return { user: newUser, status: 200 };
  } catch (err) {
    console.log({ err });
    return { message: "Something went wrong", status: 500 };
  }
}

"use server";

import { apiAddress } from "@/lib/variables";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: {
    message: string;
    code: number;
  } | null,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const res = await fetch(`${apiAddress}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      (await cookies()).set({
        name: "access_token",
        value: data.jwt,
        httpOnly: true,
        path: "/",
      });
      redirect("/");
    } else {
      return { message: data.message, code: res.status };
    }
  } catch (err) {
    if (isRedirectError(err)) {
      redirect("/");
    }
    console.log(err);
    return { message: "Something went wrong", code: 500 };
  }
}

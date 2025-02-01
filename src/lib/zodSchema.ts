import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(4, { message: "Can not be less than 4 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    lastName: z
      .string()
      .min(4, { message: "Can not be less than 4 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    username: z
      .string()
      .min(4, { message: "Can not be less than 4 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    password: z
      .string()
      .min(8, { message: "Can not be less than 8 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    //   .regex(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/), {
    //     message: "Must include alphanumeric and non-alphanumeric characters",
    //   }),
    confirmPassword: z
      .string()
      .min(8, { message: "Can not be less than 8 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    // .regex(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/), {
    //   message: "Must include alphanumeric and non-alphanumeric characters",
    // }),
    email: z
      .string()
      .email({ message: "Please input a valid email address" })
      .max(30, { message: "Must contain at most 30 characters" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

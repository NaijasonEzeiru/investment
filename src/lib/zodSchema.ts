import { z } from "zod";
import isMobilePhone from "validator/es/lib/isMobilePhone";

const ROLES = ["user", "moderator", "admin"] as const;
const METHODS = ["crypto", "cashapp/wave"] as const;

export const RegisterSchema = (t: (arg: string) => string) =>
  z
    .object({
      firstName: z
        .string()
        .min(2, { message: t("min-2") })
        .max(20, { message: t("max-20") }),
      lastName: z
        .string()
        .min(2, { message: t("min-2") })
        .max(20, { message: t("max-20") }),
      referralCode: z.string().optional(),
      transferPin: z.string().length(4, { message: t("4") }),
      username: z
        .string()
        .min(4, { message: t("min-4") })
        .max(20, { message: t("max-20") }),
      phone: z.string().refine(isMobilePhone),
      password: z
        .string()
        .min(8, { message: t("min-8") })
        .max(20, { message: t("max-20") }),
      confirmPassword: z
        .string()
        .min(8, { message: t("min-8") })
        .max(20, { message: t("max-20") }),
      email: z
        .string()
        .email({ message: t("email") })
        .max(40, { message: t("max-40") }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("password"),
          path: ["confirmPassword"],
        });
      }
    });

export const RegisterSchemaRoute = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    referralCode: z.string().optional(),
    transferPin: z.string().length(4, { message: "Must be 4 digits long" }),
    username: z
      .string()
      .min(4, { message: "Can not be less than 4 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    phone: z.string().refine(isMobilePhone),
    password: z
      .string()
      .min(8, { message: "Can not be less than 8 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Can not be less than 8 characters" })
      .max(20, { message: "Can not be more than 20 characters" }),
    email: z
      .string()
      .email({ message: "Please input a valid email address" })
      .max(40, { message: "Can not be more than 40 characters" }),
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

export const EditUserSchema = (t: (arg: string) => string) =>
  z.object({
    firstName: z
      .string()
      .min(2, { message: t("min-2") })
      .max(20, { message: t("max-20") }),
    lastName: z
      .string()
      .min(2, { message: t("min-2") })
      .max(20, { message: t("max-20") }),
    transferPin: z.string().length(4, { message: t("4") }),
    username: z
      .string()
      .min(4, { message: t("min-4") })
      .max(20, { message: t("max-20") }),
    phone: z.string().refine(isMobilePhone),
    password: z
      .string()
      .min(8, { message: t("min-8") })
      .max(20, { message: t("max-20") }),
    email: z
      .string()
      .email({ message: t("email") })
      .max(40, { message: t("max-40") }),
    role: z.enum(ROLES),
    level: z.coerce.number(),
    completedTasks: z.coerce.number(),
    // TODO: constrain balance to non-negative. preferrably in HTML
    balance: z.string(),
    interest: z.string(),
    // completedTasks: z.coerce.number().gte(0),
  });

export const EditUserSchemaRoute = z.object({
  firstName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(20, { message: "Can not be more than 20 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(20, { message: "Can not be more than 20 characters" }),
  transferPin: z.string().length(4, { message: "Must be 4 digits long" }),
  username: z
    .string()
    .min(4, { message: "Can not be less than 4 characters" })
    .max(20, { message: "Can not be more than 20 characters" }),
  phone: z.string().refine(isMobilePhone),
  password: z
    .string()
    .min(8, { message: "Can not be less than 8 characters" })
    .max(20, { message: "Can not be more than 20 characters" }),
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(40, { message: "Can not be more than 40 characters" }),
  role: z.enum(ROLES),
  level: z.coerce.number(),
  completedTasks: z.coerce.number(),
  // TODO: constrain balance to non-negative. preferrably in HTML
  balance: z.string(),
  interest: z.string(),
  // completedTasks: z.coerce.number().gte(0),
});

export const EditProfileSchema = (t: (arg: string) => string) =>
  z.object({
    firstName: z
      .string()
      .min(2, { message: t("min-2") })
      .max(40, { message: t("max-40") }),
    lastName: z
      .string()
      .min(2, { message: t("min-2") })
      .max(40, { message: t("max-40") }),
    username: z
      .string()
      .min(4, { message: t("min-4") })
      .max(20, { message: t("max-20") }),
    phone: z.string().refine(isMobilePhone),
    email: z
      .string()
      .email({ message: t("email") })
      .max(40, { message: t("max-40") }),
  });

export const EditProfileSchemaRoute = z.object({
  firstName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(40, { message: "Can not be more than 40 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(40, { message: "Can not be more than 40 characters" }),
  username: z
    .string()
    .min(4, { message: "Can not be less than 4 characters" })
    .max(20, { message: "Can not be more than 20 characters" }),
  phone: z.string().refine(isMobilePhone),
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(40, { message: "Can not be more than 40 characters" }),
});

export const PaymentSchema = (t: (arg: string) => string) =>
  z.object({
    amount: z.coerce.number().positive(),
    method: z.enum(METHODS, {
      message: t("select"),
    }),
  });

export const LoginSchema = (t: (arg: string) => string) =>
  z.object({
    email: z
      .string()
      .email({ message: t("email") })
      .max(40, { message: t("max-40") }),
    password: z
      .string()
      .min(4, { message: t("min-4") })
      .max(20, { message: t("max-40") }),
  });

export const HotelSchema = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string()
      .min(4, { message: t("min-4") })
      .max(120, { message: t("max-120") }),
    description: z.string(),
    rating: z.string(),
    totalRatings: z.coerce.number().positive(),
    imgUrl: z.string().url(),
    state: z.string(),
    country: z.string(),
    dailyProfits: z.coerce.number().positive(),
    price: z.coerce.number().positive(),
    totalReturns: z.coerce.number().positive(),
  });

export const HotelBusinessSchema = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string()
      .min(4, { message: t("min-4") })
      .max(120, { message: t("max-120") }),
    description: z.string(),
    imgUrl: z.string().url(),
    state: z.string(),
    country: z.string(),
    // price: z.coerce.number().positive(),
  });

export const NFTSchema = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string()
      .min(4, { message: t("min-4") })
      .max(120, { message: t("max-120") }),
    description: z.string(),
    rating: z.string(),
    number: z.coerce.number().positive(),
    totalRatings: z.coerce.number().positive(),
    imgUrl: z.string().url(),
    collection: z.string(),
    category: z.string(),
    price: z.coerce.number().positive(),
  });

export const NFTCreatorSchema = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string()
      .min(4, { message: t("min-4") })
      .max(120, { message: t("max-120") }),
    description: z.string(),
    imgUrl: z.string().url(),
    collection: z.string(),
    category: z.string(),
    // price: z.coerce.number().positive(),
  });

export const pinSchema = (t: (arg: string) => string) =>
  z.object({
    transferPin: z.string().length(4, { message: t("4") }),
  });

export const AddressesSchema = z.object({
  coin: z.string(),
  address: z.string(),
  imgURL: z.any().optional(),
  value: z.string(),
});

export const AppSchema = z.object({
  app: z.enum(["cashApp", "wave"]),
  tag: z.string(),
});

export const ChangePinSchema = (t: (arg: string) => string) =>
  z.object({
    transferPin: z.string().length(4, { message: t("4") }),
    oldPin: z.string().length(4, { message: t("4") }),
  });

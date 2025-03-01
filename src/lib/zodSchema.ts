import { z } from "zod";
import isMobilePhone from "validator/es/lib/isMobilePhone";

const ROLES = ["user", "moderator", "admin"] as const;
const METHODS = ["crypto", "cash-app"] as const;

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Can not be less than 2 characters" })
      .max(40, { message: "Can not be more than 40 characters" }),
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

export const EditUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(40, { message: "Can not be more than 40 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Can not be less than 2 characters" })
    .max(40, { message: "Can not be more than 40 characters" }),
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
    .max(30, { message: "Must contain at most 30 characters" }),
  // TODO: change to enum
  role: z.enum(ROLES),
  level: z.coerce.number(),
  // TODO: constrain balance to non-negative. preferrably in HTML
  balance: z.string(),
  // completedTasks: z.coerce.number().gte(0),
});

export const EditProfileSchema = z.object({
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
    .max(30, { message: "Must contain at most 30 characters" }),
});

export const PaymentSchema = z.object({
  amount: z.coerce.number().positive(),
  method: z.enum(METHODS, {
    message: "Please select a payment method",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
});

export const HotelSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(120, { message: "Must contain at most 120 characters" }),
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
export const HotelBusinessSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(120, { message: "Must contain at most 120 characters" }),
  description: z.string(),
  imgUrl: z.string().url(),
  state: z.string(),
  country: z.string(),
  price: z.coerce.number().positive(),
});

export const NFTSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(120, { message: "Must contain at most 120 characters" }),
  description: z.string(),
  rating: z.string(),
  number: z.coerce.number().positive(),
  totalRatings: z.coerce.number().positive(),
  imgUrl: z.string().url(),
  collection: z.string(),
  category: z.string(),
  price: z.coerce.number().positive(),
});

export const NFTCreatorSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(120, { message: "Must contain at most 120 characters" }),
  description: z.string(),
  imgUrl: z.string().url(),
  collection: z.string(),
  category: z.string(),
  price: z.coerce.number().positive(),
});

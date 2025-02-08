import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 120 }).notNull(),
  lastName: varchar("last_name", { length: 120 }).notNull(),
  username: varchar("username", { length: 120 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 120 }).notNull(),
  email: varchar("email", { length: 120 }).notNull().unique(),
  referralCode: varchar("referral_code", { length: 50 })
    .unique()
    .default(sql`gen_random_uuid()`),
  transferPin: varchar("transfer_pin", { length: 10 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  role: text("role", { enum: ["admin", "user", "moderator"] })
    .default("user")
    .notNull(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
// export const userRelations = relations(users, ({ many }) => ({
//   pets: many(pets),
// }));

// export const accounts = pgTable(
//   "account",
//   {
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     type: text("type").$type<AdapterAccount["type"]>().notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => ({
//     compoundKey: primaryKey(account.provider, account.providerAccountId),
//   })
// );

// export const sessions = pgTable("session", {
//   sessionToken: text("sessionToken").notNull().primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("indentifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (vt) => ({ compoundKey: primaryKey(vt.identifier, vt.token) })
// );

// export type NewUser = InferInsertModel<typeof users>;

// export const pets = pgTable("pet", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   petName: varchar("pet_name", { length: 20 }).notNull(),
//   country: varchar("country", { length: 20 }).notNull(),
//   state: varchar("state", { length: 20 }).notNull(),
//   breed: varchar("breed", { length: 30 }).notNull(),
//   purebred: varchar("pure_bred", { length: 30 }).notNull(),
//   age: varchar("age", { length: 20 }).notNull(),
//   gender: varchar("gender", { length: 7 }).notNull(),
//   description: text("description").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   imgs: varchar("cloudinary_ids", { length: 120 })
//     .array()
//     .notNull()
//     .$type<Array<string>>(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   category: text("category")
//     .notNull()
//     .references(() => categories.name),
//   city: varchar("city", { length: 20 }).notNull(),
// });

// export const petsRelations = relations(pets, ({ one }) => ({
//   user: one(users, {
//     fields: [pets.userId],
//     references: [users.id],
//   }),
//   pets: one(categories, {
//     fields: [pets.category],
//     references: [categories.name],
//   }),
// }));

// export type Pet = InferSelectModel<typeof pets>;
// export type NewPet = InferInsertModel<typeof pets>;

// export const categories = pgTable("category", {
//   name: text("name").primaryKey(),
// });

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   products: many(pets),
// }));

// export type Categories = InferSelectModel<typeof categories>;
// export type NewCategories = InferInsertModel<typeof categories>;

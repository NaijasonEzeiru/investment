import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  smallint,
} from "drizzle-orm/pg-core";

export const users = pgTable("person", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 120 }).notNull(),
  lastName: varchar("last_name", { length: 120 }).notNull(),
  username: varchar("username", { length: 120 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 120 }).notNull(),
  email: varchar("email", { length: 120 }).notNull().unique(),
  transferPin: varchar("transfer_pin", { length: 10 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  role: text("role", { enum: ["admin", "user", "moderator"] })
    .default("user")
    .notNull(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  upline: text(),
  level: smallint().default(1).notNull(),
  balance: integer().default(800).notNull(),
  completedTasks: smallint("completed_tasks").default(0).notNull(),
  interest: integer().default(0).notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  downlines: many(users),
  userId: one(users, {
    fields: [users.upline],
    references: [users.id],
  }),
}));

export const hotels = pgTable("hotel", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
  // TODO: chnage to decimal
  rating: varchar("rating", { length: 120 }).notNull(),
  totalRatings: integer("total_ratings").default(0).notNull(),
  imgUrl: varchar("img_url").notNull(),
  state: varchar("state", { length: 120 }).notNull(),
  country: varchar("country", { length: 50 }).notNull(),
  dailyProfits: smallint("daily_profits").notNull(),
  totalReturns: integer("total_returns").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const NFTs = pgTable("NFT", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
  number: integer().notNull(),
  // TODO: chnage to decimal
  rating: varchar("rating", { length: 120 }).notNull(),
  totalRatings: integer("total_ratings").default(0).notNull(),
  imgUrl: varchar("img_url").notNull(),
  collection: varchar("collection", { length: 40 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NFT = InferSelectModel<typeof NFTs>;
export type Hotel = InferSelectModel<typeof hotels>;

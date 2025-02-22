import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  smallint,
  check,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "person",
  {
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
    balance: numeric({ precision: 10, scale: 2 }).default("0").notNull(),
    completedTasks: smallint("completed_tasks").default(0).notNull(),
    reviewed: text()
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    interest: numeric({ precision: 10, scale: 2 }).default("0").notNull(),
  },
  (table) => [
    check("balance_check1", sql`${table.balance} >= 0`),
    check("completed_tasks_check1", sql`${table.completedTasks} < 31`),
  ]
);

export const usersRelations = relations(users, ({ one, many }) => ({
  downlines: many(users, { relationName: "downlines" }),
  userId: one(users, {
    fields: [users.upline],
    references: [users.id],
    relationName: "upline",
  }),
}));

export const listings = pgTable("listing", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
  number: integer(),
  type: text({ enum: ["hotel", "NFT"] }).default("hotel"),
  // TODO: change to decimal
  rating: varchar("rating", { length: 120 }).notNull(),
  totalRatings: integer("total_ratings").default(0).notNull(),
  imgUrl: varchar("img_url").notNull(),
  state: varchar("state", { length: 120 }),
  country: varchar("country", { length: 50 }),
  dailyProfits: smallint("daily_profits"),
  totalReturns: integer("total_returns"),
  collection: varchar("collection", { length: 40 }),
  category: varchar("category", { length: 50 }),
  price: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Listing = InferSelectModel<typeof listings>;

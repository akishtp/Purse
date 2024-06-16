import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  hashedPassword: text("hashed_password"),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const accountTable = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),

  name: text("name").notNull(),
  balance: integer("balance").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export const transactionTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),

  type: text("type").notNull(),
  amount: integer("amount").notNull(),
  category: text("category").notNull(),
  account: text("account").notNull(),
  accountId: integer("accountId")
    .notNull()
    .references(() => accountTable.id),
  dateTime: timestamp("date_time", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  note: text("note").notNull(),
});

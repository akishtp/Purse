import { pgTable, text, timestamp, integer, serial } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  hashedPassword: text("hashed_password"),
});

export const sessionTable = pgTable("session", {
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
});

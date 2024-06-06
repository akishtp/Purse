import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { timestamp, text, pgTableCreator } from "drizzle-orm/pg-core";
import db from ".";

const pgTable = pgTableCreator((name) => `project1_${name}`);

const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  hashedPassword: text("hashed_password"),
  googleId: text("google_id").unique(),
});

const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, table => [index("idx_enquiries_email_created_at").on(table.email, table.createdAt)]);

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  context: text("context").notNull().default(""),
  quote: text("quote").notNull(),
  published: integer("published").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const chatThreads = sqliteTable("chat_threads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tokenHash: text("token_hash").notNull().unique(),
  status: text("status").notNull().default("assistant"),
  visitorName: text("visitor_name").notNull().default(""),
  visitorEmail: text("visitor_email").notNull().default(""),
  handoffAt: text("handoff_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, table => [index("idx_chat_threads_updated_at").on(table.updatedAt)]);

export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  threadId: integer("thread_id").notNull().references(() => chatThreads.id),
  sender: text("sender").notNull(),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, table => [index("idx_chat_messages_thread_id_id").on(table.threadId, table.id)]);

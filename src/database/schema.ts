import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';

// Providers Table
export const providers = pgTable('providers', {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  roll: text('roll'),
  hashedPassword: text('hashed_password'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Admins Table
export const admins = pgTable('admins', {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  roll: text('roll'),
  hashedPassword: text('hashed_password'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Forms Table
export const forms = pgTable('forms', {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid('provider_id').notNull().references(() => providers.id),
  adminId: uuid('admin_id').notNull().references(() => admins.id),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  status: text('status').notNull().default('pending'), // 'accepted', 'denied', 'pending'
});

// Contacts Table
export const contacts = pgTable('contacts', {
  id: uuid("id").primaryKey().defaultRandom(),
  formId: uuid('form_id').notNull().references(() => forms.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Provider Sessions Table
export const providerSessions = pgTable('provider_sessions', {
  id: text("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => providers.id), // column has to be userId for lucia-auth
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

// Admin Sessions Table
export const adminSessions = pgTable('admin_sessions', {
  id: text("id").primaryKey(),
  userId: uuid('user_id').notNull().references(() => admins.id, { onDelete: 'cascade' }), // column has to be userId for lucia-auth
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});
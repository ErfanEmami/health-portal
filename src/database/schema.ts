import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';

// Providers Table
export const providers = pgTable('providers', {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Admins Table
export const admins = pgTable('admins', {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const forms = pgTable('forms', {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => providers.id),
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
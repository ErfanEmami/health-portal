ALTER TABLE "admin_sessions" RENAME COLUMN "admin_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "provider_sessions" RENAME COLUMN "provider_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "admin_sessions" DROP CONSTRAINT "admin_sessions_admin_id_admins_id_fk";
--> statement-breakpoint
ALTER TABLE "provider_sessions" DROP CONSTRAINT "provider_sessions_provider_id_providers_id_fk";
--> statement-breakpoint
ALTER TABLE "admin_sessions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "admin_sessions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "admin_sessions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "admin_sessions" ALTER COLUMN "expires_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "provider_sessions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "provider_sessions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "provider_sessions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "provider_sessions" ALTER COLUMN "expires_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_user_id_admins_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "provider_sessions" ADD CONSTRAINT "provider_sessions_user_id_providers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."providers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

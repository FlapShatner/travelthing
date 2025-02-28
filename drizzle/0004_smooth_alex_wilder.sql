CREATE TABLE "user_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text,
	"first_name" text,
	"last_name" text,
	"country" text,
	"city" text,
	"state" text,
	"bio" text,
	"facebook_link" text,
	"instagram_link" text,
	"discord_link" text,
	"twitter_link" text,
	"threads_link" text,
	"bluesky_link" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
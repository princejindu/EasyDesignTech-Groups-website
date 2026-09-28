CREATE TABLE `chat_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`thread_id` integer NOT NULL,
	`sender` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`thread_id`) REFERENCES `chat_threads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_chat_messages_thread_id_id` ON `chat_messages` (`thread_id`,`id`);--> statement-breakpoint
CREATE TABLE `chat_threads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`token_hash` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chat_threads_token_hash_unique` ON `chat_threads` (`token_hash`);--> statement-breakpoint
CREATE INDEX `idx_chat_threads_updated_at` ON `chat_threads` (`updated_at`);
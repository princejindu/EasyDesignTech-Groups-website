ALTER TABLE `chat_threads` ADD `status` text DEFAULT 'assistant' NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_threads` ADD `visitor_name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_threads` ADD `visitor_email` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_threads` ADD `handoff_at` text;--> statement-breakpoint
UPDATE `chat_threads` SET `status` = 'human', `handoff_at` = `updated_at` WHERE `id` IN (SELECT `thread_id` FROM `chat_messages` WHERE `sender` = 'support');

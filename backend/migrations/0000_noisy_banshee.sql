CREATE TABLE `songs` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`lyric` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `titleIdx` ON `songs` (`title`);
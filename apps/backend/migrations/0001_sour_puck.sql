DROP INDEX IF EXISTS `titleIdx`;--> statement-breakpoint
CREATE INDEX `titleIdx` ON `songs` (`title`);
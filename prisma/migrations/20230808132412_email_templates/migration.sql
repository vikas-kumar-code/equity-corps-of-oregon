-- CreateTable
CREATE TABLE `email_templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(255) NOT NULL,
    `from_email` VARCHAR(100) NOT NULL,
    `from_label` VARCHAR(100) NOT NULL,
    `content` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER NOT NULL,
    `name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `phone_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `role_id` INTEGER NOT NULL DEFAULT 0,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(0) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `varified` INTEGER NOT NULL DEFAULT 0,
    `verification_code` VARCHAR(20) NULL,
    `code_valid_till` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `added_by` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
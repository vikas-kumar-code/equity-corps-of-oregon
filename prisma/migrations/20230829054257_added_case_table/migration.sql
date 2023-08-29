/*
  Warnings:

  - Added the required column `file_name` to the `case_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `case_number` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `case_documents` ADD COLUMN `file_name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `cases` ADD COLUMN `case_number` VARCHAR(50) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `sequence` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `routes` MODIFY `label` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `eoir_registered` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `first_name` VARCHAR(100) NULL,
    ADD COLUMN `is_oregon_state_bar_member` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `languages_supports` TEXT NULL,
    ADD COLUMN `last_name` VARCHAR(100) NULL,
    ADD COLUMN `law_firm_name` VARCHAR(255) NULL,
    ADD COLUMN `oregon_state_bar_number` VARCHAR(100) NULL,
    ADD COLUMN `phone` VARCHAR(100) NULL,
    ADD COLUMN `practice_areas` TEXT NULL,
    MODIFY `name` VARCHAR(200) NULL,
    MODIFY `email` VARCHAR(150) NULL,
    MODIFY `password` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `case_invitations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `case_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `sent_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_associated_names` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `case_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attorney_answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `answer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `case_id` INTEGER NULL,
    `content` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

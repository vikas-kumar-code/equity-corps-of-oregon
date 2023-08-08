/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `answerx` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `questions` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `answers`;

-- DropTable
DROP TABLE `answerx`;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `option` TEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
  Warnings:

  - Added the required column `option` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `options` ADD COLUMN `option` TEXT NOT NULL;

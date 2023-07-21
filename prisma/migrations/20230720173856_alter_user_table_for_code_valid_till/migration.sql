/*
  Warnings:

  - You are about to drop the column `remember_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `remember_token`,
    ADD COLUMN `code_valid_till` DATETIME(3) NULL;

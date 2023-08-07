-- DropIndex
DROP INDEX `cases_added_by_fkey` ON `cases`;

-- DropIndex
DROP INDEX `permissions_route_id_fkey` ON `permissions`;

-- DropIndex
DROP INDEX `users_role_id_fkey` ON `users`;

-- CreateTable
CREATE TABLE `answerx` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

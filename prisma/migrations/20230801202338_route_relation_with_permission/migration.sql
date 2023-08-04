-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_route_id_fkey` FOREIGN KEY (`route_id`) REFERENCES `routes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

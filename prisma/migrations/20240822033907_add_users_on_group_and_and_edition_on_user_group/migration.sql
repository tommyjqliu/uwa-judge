-- CreateTable
CREATE TABLE `UsersOnGroups` (
    `id` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,

    INDEX `UsersOnGroups_userId_idx`(`id`),
    INDEX `UsersOnGroups_groupId_idx`(`groupId`),
    PRIMARY KEY (`id`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnGroups` ADD CONSTRAINT `UsersOnGroups_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnGroups` ADD CONSTRAINT `UsersOnGroups_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `UserGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

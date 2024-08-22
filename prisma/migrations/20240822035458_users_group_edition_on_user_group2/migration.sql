/*
  Warnings:

  - The primary key for the `UsersOnGroups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersOnGroups` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UsersOnGroups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UsersOnGroups` DROP FOREIGN KEY `UsersOnGroups_id_fkey`;

-- AlterTable
ALTER TABLE `UsersOnGroups` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `groupId`);

-- CreateIndex
CREATE INDEX `UsersOnGroups_userId_idx` ON `UsersOnGroups`(`userId`);

-- AddForeignKey
ALTER TABLE `UsersOnGroups` ADD CONSTRAINT `UsersOnGroups_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

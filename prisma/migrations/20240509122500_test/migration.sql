/*
  Warnings:

  - You are about to drop the `UsersOnAssignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UsersOnAssignments` DROP FOREIGN KEY `UsersOnAssignments_assignmentId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnAssignments` DROP FOREIGN KEY `UsersOnAssignments_userId_fkey`;

-- DropTable
DROP TABLE `UsersOnAssignments`;

-- CreateTable
CREATE TABLE `StudentsOnAssignments` (
    `assignmentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`assignmentId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentsOnAssignments` ADD CONSTRAINT `StudentsOnAssignments_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentsOnAssignments` ADD CONSTRAINT `StudentsOnAssignments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

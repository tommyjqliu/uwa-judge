/*
  Warnings:

  - You are about to drop the column `name` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Assignment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Assignment` DROP COLUMN `name`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `publishDate` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AssignmentProblem` (
    `assignmentId` INTEGER NOT NULL,
    `problemId` INTEGER NOT NULL,

    PRIMARY KEY (`assignmentId`, `problemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignmentUser` (
    `assignmentId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`assignmentId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentProblem` ADD CONSTRAINT `AssignmentProblem_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentProblem` ADD CONSTRAINT `AssignmentProblem_problemId_fkey` FOREIGN KEY (`problemId`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentUser` ADD CONSTRAINT `AssignmentUser_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentUser` ADD CONSTRAINT `AssignmentUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `assignmentId` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `problemId` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submissionDate` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `fk_assignment_submission`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `fk_problem_submission`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `fk_user_submission`;

-- AlterTable
ALTER TABLE `Submission` MODIFY `assignmentId` INTEGER NOT NULL,
    MODIFY `problemId` VARCHAR(255) NOT NULL,
    MODIFY `submissionDate` DATETIME(3) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_assignment_submission` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_problem_submission` FOREIGN KEY (`problemId`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_user_submission` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

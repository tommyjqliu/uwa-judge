/*
  Warnings:

  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Submission` DROP PRIMARY KEY,
    ADD COLUMN `assignmentId` INTEGER NULL,
    ADD COLUMN `problemId` VARCHAR(255) NULL,
    ADD COLUMN `submissionDate` DATETIME(3) NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `fk_assignment_submission` ON `Submission`(`assignmentId`);

-- CreateIndex
CREATE INDEX `fk_problem_submission` ON `Submission`(`problemId`);

-- CreateIndex
CREATE INDEX `fk_user_submission` ON `Submission`(`userId`);

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_assignment_submission` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_problem_submission` FOREIGN KEY (`problemId`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `fk_user_submission` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

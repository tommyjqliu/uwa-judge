-- CreateTable
CREATE TABLE `_AssignmentToProblem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AssignmentToProblem_AB_unique`(`A`, `B`),
    INDEX `_AssignmentToProblem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssignmentToProblem` ADD CONSTRAINT `_AssignmentToProblem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Assignment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssignmentToProblem` ADD CONSTRAINT `_AssignmentToProblem_B_fkey` FOREIGN KEY (`B`) REFERENCES `Problem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

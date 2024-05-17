/*
  Warnings:

  - You are about to drop the column `roles` on the `UsersOnAssignments` table. All the data in the column will be lost.
  - You are about to drop the `AssignmentRoleDescription` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UsersOnAssignments` DROP COLUMN `roles`;

-- DropTable
DROP TABLE `AssignmentRoleDescription`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

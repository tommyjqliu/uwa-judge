/*
  Warnings:

  - The primary key for the `Executable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `execId` on the `Executable` table. All the data in the column will be lost.
  - You are about to drop the column `executableExecId` on the `ExecutableFile` table. All the data in the column will be lost.
  - You are about to drop the column `executableId` on the `ProblemVersion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `ProblemVersion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Executable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemVersionId` to the `Judge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProblemVersion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExecutableFile" DROP CONSTRAINT "ExecutableFile_executableExecId_fkey";

-- DropForeignKey
ALTER TABLE "JudgeTask" DROP CONSTRAINT "JudgeTask_judgeId_fkey";

-- DropForeignKey
ALTER TABLE "JudgeTask" DROP CONSTRAINT "JudgeTask_testcaseId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_executableId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_problemVersionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "Executable" DROP CONSTRAINT "Executable_pkey",
DROP COLUMN "execId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Executable_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ExecutableFile" DROP COLUMN "executableExecId",
ADD COLUMN     "executableId" TEXT;

-- AlterTable
ALTER TABLE "Judge" ADD COLUMN     "problemVersionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProblemVersion" DROP COLUMN "executableId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProblemVersion_hash_key" ON "ProblemVersion"("hash");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeTask" ADD CONSTRAINT "JudgeTask_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "Testcase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeTask" ADD CONSTRAINT "JudgeTask_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_executableId_fkey" FOREIGN KEY ("executableId") REFERENCES "Executable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutableFile" ADD CONSTRAINT "ExecutableFile_executableId_fkey" FOREIGN KEY ("executableId") REFERENCES "Executable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

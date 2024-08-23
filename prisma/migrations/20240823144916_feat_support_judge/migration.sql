/*
  Warnings:

  - You are about to drop the column `description` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Problem` table. All the data in the column will be lost.
  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignmentId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDate` on the `Submission` table. All the data in the column will be lost.
  - The `id` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProblemsOnAssignments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assignmentId` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemVersionId` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestCaseType" AS ENUM ('sample', 'secret');

-- DropForeignKey
ALTER TABLE "ProblemsOnAssignments" DROP CONSTRAINT "ProblemsOnAssignments_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemsOnAssignments" DROP CONSTRAINT "ProblemsOnAssignments_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "fk_assignment_submission";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "fk_problem_submission";

-- DropIndex
DROP INDEX "Submission_assignmentId_idx";

-- DropIndex
DROP INDEX "Submission_problemId_idx";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "assignmentId" INTEGER NOT NULL,
ADD COLUMN     "problemVersionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
DROP COLUMN "assignmentId",
DROP COLUMN "submissionDate",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "problemVersionId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "problemId" DROP NOT NULL,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ProblemsOnAssignments";

-- CreateTable
CREATE TABLE "ProblemVersion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "file" BYTEA NOT NULL,

    CONSTRAINT "ProblemVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testcase" (
    "id" SERIAL NOT NULL,
    "type" "TestCaseType" NOT NULL,
    "name" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "problemVersionId" INTEGER NOT NULL,

    CONSTRAINT "Testcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "score" INTEGER,
    "time" INTEGER,
    "memory" INTEGER,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeTask" (
    "id" SERIAL NOT NULL,
    "judgeId" INTEGER NOT NULL,
    "testcaseId" INTEGER NOT NULL,
    "compileSuccess" BOOLEAN,
    "compileOutput" TEXT,
    "compileMetadata" TEXT,
    "runResult" TEXT,
    "runTime" DOUBLE PRECISION,
    "runOutput" TEXT,
    "runError" TEXT,
    "runSystem" TEXT,
    "runMetadata" TEXT,
    "runDiff" TEXT,

    CONSTRAINT "JudgeTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extensions" TEXT[],
    "requireEntryPoint" BOOLEAN NOT NULL,
    "entryPointDescription" TEXT,
    "allowSubmit" BOOLEAN NOT NULL,
    "allowJudge" BOOLEAN NOT NULL,
    "timeFactor" DOUBLE PRECISION NOT NULL,
    "compilerVersionCommand" TEXT,
    "runnerVersionCommand" TEXT,
    "executableId" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Executable" (
    "execId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "languageId" TEXT,

    CONSTRAINT "Executable_pkey" PRIMARY KEY ("execId")
);

-- CreateTable
CREATE TABLE "ExecutableFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "isExecutable" BOOLEAN NOT NULL,
    "executableExecId" TEXT,

    CONSTRAINT "ExecutableFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProblemVersion_hash_idx" ON "ProblemVersion"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Language_executableId_key" ON "Language"("executableId");

-- CreateIndex
CREATE INDEX "Submission_problemVersionId_idx" ON "Submission"("problemVersionId");

-- RenameForeignKey
ALTER TABLE "Submission" RENAME CONSTRAINT "fk_user_submission" TO "Submission_userId_fkey";

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeTask" ADD CONSTRAINT "JudgeTask_testcaseId_fkey" FOREIGN KEY ("testcaseId") REFERENCES "Testcase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeTask" ADD CONSTRAINT "JudgeTask_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_executableId_fkey" FOREIGN KEY ("executableId") REFERENCES "Executable"("execId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutableFile" ADD CONSTRAINT "ExecutableFile_executableExecId_fkey" FOREIGN KEY ("executableExecId") REFERENCES "Executable"("execId") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[problemVersionId]` on the table `Executable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metadata` to the `ProblemVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Executable" ADD COLUMN     "problemVersionId" INTEGER;

-- AlterTable
ALTER TABLE "ProblemVersion" ADD COLUMN     "combinedRunCompare" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "executableId" TEXT,
ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Executable_problemVersionId_key" ON "Executable"("problemVersionId");

-- AddForeignKey
ALTER TABLE "Executable" ADD CONSTRAINT "Executable_problemVersionId_fkey" FOREIGN KEY ("problemVersionId") REFERENCES "ProblemVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

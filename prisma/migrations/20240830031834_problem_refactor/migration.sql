/*
  Warnings:

  - Added the required column `problemStatementHash` to the `ProblemVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Judge" ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stopOnError" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProblemVersion" ADD COLUMN     "problemStatementHash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProblemStatement" (
    "hash" TEXT NOT NULL,
    "file" BYTEA NOT NULL,

    CONSTRAINT "ProblemStatement_pkey" PRIMARY KEY ("hash")
);

-- AddForeignKey
ALTER TABLE "ProblemVersion" ADD CONSTRAINT "ProblemVersion_problemStatementHash_fkey" FOREIGN KEY ("problemStatementHash") REFERENCES "ProblemStatement"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

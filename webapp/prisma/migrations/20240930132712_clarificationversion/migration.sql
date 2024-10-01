-- CreateTable
CREATE TABLE "Clarification" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL,

    CONSTRAINT "Clarification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Clarification_assignmentId_idx" ON "Clarification"("assignmentId");

-- AddForeignKey
ALTER TABLE "Clarification" ADD CONSTRAINT "Clarification_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

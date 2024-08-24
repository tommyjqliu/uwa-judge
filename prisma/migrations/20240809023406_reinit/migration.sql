-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "ExternalAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "publishDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminsOnAssignments" (
    "assignmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminsOnAssignments_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- CreateTable
CREATE TABLE "TutorsOnAssignments" (
    "assignmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TutorsOnAssignments_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- CreateTable
CREATE TABLE "StudentsOnAssignments" (
    "assignmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudentsOnAssignments_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemsOnAssignments" (
    "problemId" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,

    CONSTRAINT "ProblemsOnAssignments_pkey" PRIMARY KEY ("problemId","assignmentId")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" VARCHAR(255) NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToUserGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "ExternalAccount_userId_idx" ON "ExternalAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalAccount_provider_userId_key" ON "ExternalAccount"("provider", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalAccount_provider_providerId_key" ON "ExternalAccount"("provider", "providerId");

-- CreateIndex
CREATE INDEX "AdminsOnAssignments_userId_idx" ON "AdminsOnAssignments"("userId");

-- CreateIndex
CREATE INDEX "TutorsOnAssignments_userId_idx" ON "TutorsOnAssignments"("userId");

-- CreateIndex
CREATE INDEX "StudentsOnAssignments_userId_idx" ON "StudentsOnAssignments"("userId");

-- CreateIndex
CREATE INDEX "ProblemsOnAssignments_assignmentId_idx" ON "ProblemsOnAssignments"("assignmentId");

-- CreateIndex
CREATE INDEX "Submission_assignmentId_idx" ON "Submission"("assignmentId");

-- CreateIndex
CREATE INDEX "Submission_problemId_idx" ON "Submission"("problemId");

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUser_AB_unique" ON "_PermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUserGroup_AB_unique" ON "_PermissionToUserGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUserGroup_B_index" ON "_PermissionToUserGroup"("B");

-- AddForeignKey
ALTER TABLE "ExternalAccount" ADD CONSTRAINT "ExternalAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminsOnAssignments" ADD CONSTRAINT "AdminsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminsOnAssignments" ADD CONSTRAINT "AdminsOnAssignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorsOnAssignments" ADD CONSTRAINT "TutorsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorsOnAssignments" ADD CONSTRAINT "TutorsOnAssignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemsOnAssignments" ADD CONSTRAINT "ProblemsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemsOnAssignments" ADD CONSTRAINT "ProblemsOnAssignments_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "fk_assignment_submission" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "fk_problem_submission" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "fk_user_submission" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUserGroup" ADD CONSTRAINT "_PermissionToUserGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUserGroup" ADD CONSTRAINT "_PermissionToUserGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

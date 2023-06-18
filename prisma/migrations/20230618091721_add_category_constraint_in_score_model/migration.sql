/*
  Warnings:

  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Score" DROP CONSTRAINT "Score_pkey",
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("userId", "subjectId", "categoryId");

/*
  Warnings:

  - You are about to drop the column `edit_at` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "edit_at",
ADD COLUMN     "edited_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

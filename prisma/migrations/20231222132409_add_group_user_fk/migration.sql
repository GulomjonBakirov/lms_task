/*
  Warnings:

  - You are about to drop the column `groupId` on the `students` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `student_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "groupId",
ADD COLUMN     "group_id" UUID NOT NULL,
ALTER COLUMN "student_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `group_object_id` on the `assessments` table. All the data in the column will be lost.
  - You are about to drop the `grades` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `object_id` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `assessments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_assessment_id_fkey";

-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_student_id_fkey";

-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "group_object_id",
ADD COLUMN     "object_id" UUID NOT NULL,
ADD COLUMN     "teacher_id" UUID NOT NULL;

-- DropTable
DROP TABLE "grades";

-- CreateTable
CREATE TABLE "grade_assessment" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "student_id" UUID NOT NULL,
    "assessment_id" UUID NOT NULL,
    "grade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "grade_assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "grade_assessment" ADD CONSTRAINT "grade_assessment_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grade_assessment" ADD CONSTRAINT "grade_assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

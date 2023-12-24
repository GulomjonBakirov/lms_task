/*
  Warnings:

  - A unique constraint covering the columns `[schedule_id]` on the table `grade_object` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "grade_object_schedule_id_key" ON "grade_object"("schedule_id");

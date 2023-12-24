-- CreateTable
CREATE TABLE "grade_object" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "schedule_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "grade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "grade_object_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "grade_object" ADD CONSTRAINT "grade_object_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_object" ADD CONSTRAINT "grade_object_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

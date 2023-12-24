/*
  Warnings:

  - You are about to drop the `groupObjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groupObjects" DROP CONSTRAINT "groupObjects_group_id_fkey";

-- DropForeignKey
ALTER TABLE "groupObjects" DROP CONSTRAINT "groupObjects_object_id_fkey";

-- DropForeignKey
ALTER TABLE "groupObjects" DROP CONSTRAINT "groupObjects_teacher_id_fkey";

-- DropTable
DROP TABLE "groupObjects";

-- CreateTable
CREATE TABLE "schedule" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "group_id" UUID NOT NULL,
    "object_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "start_time" TIMESTAMP(0) NOT NULL,
    "end_time" TIMESTAMP(0) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_object_id_fkey" FOREIGN KEY ("object_id") REFERENCES "objects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

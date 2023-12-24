-- AlterTable
ALTER TABLE "user_list" ADD COLUMN     "user_accesses" TEXT[];

-- CreateTable
CREATE TABLE "user_access" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "prefix" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "user_access_pkey" PRIMARY KEY ("id")
);

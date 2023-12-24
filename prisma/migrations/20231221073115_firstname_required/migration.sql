/*
  Warnings:

  - Made the column `first_name` on table `user_list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_list" ALTER COLUMN "first_name" SET NOT NULL;

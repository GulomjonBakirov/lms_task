/*
  Warnings:

  - Added the required column `hash` to the `user_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_list" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "hashedRt" TEXT;

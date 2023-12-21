/*
  Warnings:

  - You are about to drop the column `hash` on the `user_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_list" DROP COLUMN "hash",
ALTER COLUMN "hashedRt" SET DATA TYPE VARCHAR;

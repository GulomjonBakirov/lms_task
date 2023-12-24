/*
  Warnings:

  - You are about to drop the column `user_accesses` on the `user_list` table. All the data in the column will be lost.
  - You are about to drop the `user_access` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user_list" DROP COLUMN "user_accesses";

-- DropTable
DROP TABLE "user_access";

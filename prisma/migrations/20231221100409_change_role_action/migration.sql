/*
  Warnings:

  - You are about to drop the column `role_id` on the `user_list` table. All the data in the column will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_list" DROP CONSTRAINT "user_list_role_id_fkey";

-- DropIndex
DROP INDEX "user_list_role_id_key";

-- AlterTable
ALTER TABLE "user_list" DROP COLUMN "role_id",
ADD COLUMN     "role" "role_prefix" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "user_roles";

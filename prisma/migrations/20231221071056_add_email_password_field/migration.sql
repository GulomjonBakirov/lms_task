/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user_list` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_list" ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" VARCHAR(150) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_list_email_key" ON "user_list"("email");

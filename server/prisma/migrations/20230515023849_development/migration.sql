/*
  Warnings:

  - You are about to drop the column `googlesheet_id` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "googlesheet_id" TEXT;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "googlesheet_id";

/*
  Warnings:

  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_lead_id_fkey";

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "keywords" JSONB;

-- DropTable
DROP TABLE "Keyword";

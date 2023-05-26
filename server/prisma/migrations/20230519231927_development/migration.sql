-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "is_live" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total_leads" INTEGER NOT NULL DEFAULT 0;

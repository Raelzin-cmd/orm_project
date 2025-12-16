/*
  Warnings:

  - You are about to drop the column `pais` on the `authors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authors" DROP COLUMN "pais",
ADD COLUMN     "country" CHAR(2);

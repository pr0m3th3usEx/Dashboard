/*
  Warnings:

  - Added the required column `name` to the `WidgetParameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WidgetParameter" ADD COLUMN     "name" TEXT NOT NULL;

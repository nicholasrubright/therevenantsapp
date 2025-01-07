/*
  Warnings:

  - Added the required column `class_name` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_level` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spec` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "class_name" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "item_level" INTEGER NOT NULL,
ADD COLUMN     "spec" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `endDate` on the `weeklycalendar` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `weeklycalendar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `weeklycalendar` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;

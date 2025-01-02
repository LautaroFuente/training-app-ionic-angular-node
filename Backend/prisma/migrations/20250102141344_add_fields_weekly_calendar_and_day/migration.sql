/*
  Warnings:

  - You are about to drop the column `date` on the `userprogress` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `userprogress` table. All the data in the column will be lost.
  - You are about to drop the column `repetitionsCompleted` on the `userprogress` table. All the data in the column will be lost.
  - You are about to drop the column `weightUsed` on the `userprogress` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `weeklycalendar` table. All the data in the column will be lost.
  - You are about to drop the column `routineId` on the `weeklycalendar` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routineId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `WeeklyCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `WeeklyCalendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `weeklycalendar` DROP FOREIGN KEY `WeeklyCalendar_routineId_fkey`;

-- AlterTable
ALTER TABLE `userprogress` DROP COLUMN `date`,
    DROP COLUMN `notes`,
    DROP COLUMN `repetitionsCompleted`,
    DROP COLUMN `weightUsed`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `completionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dayId` INTEGER NOT NULL,
    ADD COLUMN `routineId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `weeklycalendar` DROP COLUMN `day`,
    DROP COLUMN `routineId`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Day` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'empty',
    `routineId` INTEGER NULL,
    `weeklyCalendarId` INTEGER NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoutineToWeeklyCalendar` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoutineToWeeklyCalendar_AB_unique`(`A`, `B`),
    INDEX `_RoutineToWeeklyCalendar_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Day` ADD CONSTRAINT `Day_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Day` ADD CONSTRAINT `Day_weeklyCalendarId_fkey` FOREIGN KEY (`weeklyCalendarId`) REFERENCES `WeeklyCalendar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoutineToWeeklyCalendar` ADD CONSTRAINT `_RoutineToWeeklyCalendar_A_fkey` FOREIGN KEY (`A`) REFERENCES `Routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoutineToWeeklyCalendar` ADD CONSTRAINT `_RoutineToWeeklyCalendar_B_fkey` FOREIGN KEY (`B`) REFERENCES `WeeklyCalendar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

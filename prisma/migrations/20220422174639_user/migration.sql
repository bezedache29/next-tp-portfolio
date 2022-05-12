/*
  Warnings:

  - You are about to drop the column `pseudo` on the `comment` table. All the data in the column will be lost.
  - The primary key for the `languagesonprojects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `languageId` on the `languagesonprojects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageName` to the `LanguagesOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `languagesonprojects` DROP FOREIGN KEY `LanguagesOnProjects_languageId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `pseudo`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `languagesonprojects` DROP PRIMARY KEY,
    DROP COLUMN `languageId`,
    ADD COLUMN `languageName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`projectId`, `languageName`);

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_pseudo_key`(`pseudo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Language_name_key` ON `Language`(`name`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`pseudo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LanguagesOnProjects` ADD CONSTRAINT `LanguagesOnProjects_languageName_fkey` FOREIGN KEY (`languageName`) REFERENCES `Language`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

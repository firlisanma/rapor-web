/*
  Warnings:

  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_role` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_role`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `id_role` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

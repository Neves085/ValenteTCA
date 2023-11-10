/*
  Warnings:

  - You are about to drop the column `participante` on the `sessao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessao` DROP FOREIGN KEY `Sessao_participante_fkey`;

-- AlterTable
ALTER TABLE `sessao` DROP COLUMN `participante`;

/*
  Warnings:

  - You are about to drop the `_sessaotousuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `participante` to the `Sessao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_sessaotousuario` DROP FOREIGN KEY `_SessaoToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sessaotousuario` DROP FOREIGN KEY `_SessaoToUsuario_B_fkey`;

-- AlterTable
ALTER TABLE `sessao` ADD COLUMN `participante` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_sessaotousuario`;

-- AddForeignKey
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_participante_fkey` FOREIGN KEY (`participante`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

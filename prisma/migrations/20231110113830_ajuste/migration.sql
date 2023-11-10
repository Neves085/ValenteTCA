/*
  Warnings:

  - You are about to drop the column `participante` on the `sessao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessao` DROP FOREIGN KEY `Sessao_participante_fkey`;

-- DropIndex
DROP INDEX `Sessao_nome_key` ON `sessao`;

-- AlterTable
ALTER TABLE `sessao` DROP COLUMN `participante`;

-- CreateTable
CREATE TABLE `_SessaoToUsuario` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SessaoToUsuario_AB_unique`(`A`, `B`),
    INDEX `_SessaoToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SessaoToUsuario` ADD CONSTRAINT `_SessaoToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Sessao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SessaoToUsuario` ADD CONSTRAINT `_SessaoToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

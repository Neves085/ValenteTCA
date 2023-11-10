/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Sessao` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Sessao_nome_key` ON `Sessao`(`nome`);

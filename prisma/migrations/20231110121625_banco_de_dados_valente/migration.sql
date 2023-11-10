-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `senha` CHAR(60) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `cargo` VARCHAR(191) NOT NULL DEFAULT 'user',
    `ativado` TINYINT NOT NULL DEFAULT 1,
    `imagem_perfil` LONGBLOB NULL,
    `tipo_imagem_perfil` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_customer_id_key`(`customer_id`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profissional` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `senha` CHAR(60) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `imagem_perfil` LONGBLOB NOT NULL,
    `tipo_imagem_perfil` VARCHAR(191) NOT NULL,
    `twitter` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NOT NULL DEFAULT 'profissional',
    `ativado` TINYINT NOT NULL DEFAULT 1,

    UNIQUE INDEX `Profissional_email_key`(`email`),
    UNIQUE INDEX `Profissional_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(130) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Desabafo` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `mensagem` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roda_De_Conversa` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(150) NOT NULL,
    `imagem_banner` LONGBLOB NOT NULL,
    `tipo_imagem_banner` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roda_De_Conversa_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessao` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(150) NOT NULL,
    `data_reuniao` INTEGER NOT NULL,
    `quantidade_pessoas` INTEGER NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `link_reuniao` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `criador` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `Usuario`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Desabafo` ADD CONSTRAINT `Desabafo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_tema_fkey` FOREIGN KEY (`tema`) REFERENCES `Roda_De_Conversa`(`nome`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_criador_fkey` FOREIGN KEY (`criador`) REFERENCES `Profissional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

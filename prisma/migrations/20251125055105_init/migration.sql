-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `permission` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nisn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `alamat` VARCHAR(191) NULL,
    `kelas` VARCHAR(191) NULL,

    UNIQUE INDEX `Siswa_nisn_key`(`nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

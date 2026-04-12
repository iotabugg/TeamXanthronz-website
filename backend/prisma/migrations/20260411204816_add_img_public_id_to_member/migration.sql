-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "imgPublicId" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "imgPublicId" TEXT;

-- AlterTable
ALTER TABLE "GalleryImage" ADD COLUMN     "imgPublicId" TEXT;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "imgPublicId" TEXT;

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "logoPublicId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avtarPublicId" TEXT;

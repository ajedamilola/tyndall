/*
  Warnings:

  - The `likes` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userSuperTokenId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "likes",
ADD COLUMN     "likes" TEXT[];

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userSuperTokenId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Like";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userSuperTokenId_fkey" FOREIGN KEY ("userSuperTokenId") REFERENCES "User"("superTokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

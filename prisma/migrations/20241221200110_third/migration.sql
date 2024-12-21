-- CreateEnum
CREATE TYPE "CredentialProvider" AS ENUM ('email', 'google', 'github', 'facebook');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('beginner', 'intermediary', 'advanced');

-- CreateTable
CREATE TABLE "User" (
    "superTokenId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "provider" "CredentialProvider" NOT NULL,
    "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "level" "Level" NOT NULL DEFAULT 'beginner',
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "completed_onboarding" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("superTokenId")
);

-- CreateTable
CREATE TABLE "ReadArticle" (
    "id" BIGSERIAL NOT NULL,
    "userSuperTokenId" TEXT NOT NULL,
    "articleId" BIGINT NOT NULL,

    CONSTRAINT "ReadArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" BIGSERIAL NOT NULL,
    "userSuperTokenId" TEXT NOT NULL,
    "content" TEXT,
    "positive" BOOLEAN NOT NULL DEFAULT true,
    "articleId" BIGINT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "references" JSONB NOT NULL DEFAULT '[]',
    "category" TEXT NOT NULL DEFAULT 'general',
    "fields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" TEXT NOT NULL,
    "ai" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" BIGINT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadArticle" ADD CONSTRAINT "ReadArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadArticle" ADD CONSTRAINT "ReadArticle_userSuperTokenId_fkey" FOREIGN KEY ("userSuperTokenId") REFERENCES "User"("superTokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userSuperTokenId_fkey" FOREIGN KEY ("userSuperTokenId") REFERENCES "User"("superTokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("superTokenId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("superTokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

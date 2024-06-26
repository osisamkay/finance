-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Income', 'Expense', 'Investment', 'Saving');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Housing', 'Transport', 'Health', 'Food', 'Education', 'Other');

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "category" "Category",
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

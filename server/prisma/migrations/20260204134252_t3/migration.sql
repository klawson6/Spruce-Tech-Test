-- CreateTable
CREATE TABLE "Statistic" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "X" INTEGER NOT NULL DEFAULT 0,
    "O" INTEGER NOT NULL DEFAULT 0,
    "draw" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Statistic_size_key" ON "Statistic"("size");

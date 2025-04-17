-- CreateTable
CREATE TABLE "plants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_guides" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "watering" TEXT NOT NULL,
    "sunlight" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,

    CONSTRAINT "care_guides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "care_guides_plantId_key" ON "care_guides"("plantId");

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_guides" ADD CONSTRAINT "care_guides_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

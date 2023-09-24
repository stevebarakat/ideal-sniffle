/*
  Warnings:

  - You are about to drop the column `as` on the `MixData` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MixData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL
);
INSERT INTO "new_MixData" ("data", "id", "name") SELECT "data", "id", "name" FROM "MixData";
DROP TABLE "MixData";
ALTER TABLE "new_MixData" RENAME TO "MixData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

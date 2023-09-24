-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MixData" (
    "as" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL
);
INSERT INTO "new_MixData" ("as", "data", "id", "name") SELECT "as", "data", "id", "name" FROM "MixData";
DROP TABLE "MixData";
ALTER TABLE "new_MixData" RENAME TO "MixData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

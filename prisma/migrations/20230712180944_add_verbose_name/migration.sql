/*
  Warnings:

  - Added the required column `championVerboseName` to the `RiotLeagueChampion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RiotLeagueChampion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "championId" INTEGER NOT NULL,
    "championName" TEXT NOT NULL,
    "championVerboseName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RiotLeagueChampion" ("championId", "championName", "createdAt", "id", "updatedAt") SELECT "championId", "championName", "createdAt", "id", "updatedAt" FROM "RiotLeagueChampion";
DROP TABLE "RiotLeagueChampion";
ALTER TABLE "new_RiotLeagueChampion" RENAME TO "RiotLeagueChampion";
CREATE UNIQUE INDEX "RiotLeagueChampion_championId_key" ON "RiotLeagueChampion"("championId");
CREATE UNIQUE INDEX "RiotLeagueChampion_championName_key" ON "RiotLeagueChampion"("championName");
CREATE UNIQUE INDEX "RiotLeagueChampion_championVerboseName_key" ON "RiotLeagueChampion"("championVerboseName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

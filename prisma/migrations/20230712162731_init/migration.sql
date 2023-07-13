-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "discordId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DiscordGuild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "discordId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RiotSummoner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "accountId" TEXT NOT NULL,
    "summonerName" TEXT NOT NULL,
    "summonerPuuid" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL,
    "profileIconId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RiotLeagueQueue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "queueId" INTEGER NOT NULL,
    "queueName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RiotLeagueGameMode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameMode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RiotLeagueMatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gameDuration" INTEGER NOT NULL,
    "gameModeId" TEXT NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "gameQueueId" INTEGER NOT NULL,
    "riotLeagueChampionId" TEXT,
    CONSTRAINT "RiotLeagueMatch_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "RiotLeagueGameMode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RiotLeagueMatch_gameQueueId_fkey" FOREIGN KEY ("gameQueueId") REFERENCES "RiotLeagueQueue" ("queueId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RiotLeagueMatch_riotLeagueChampionId_fkey" FOREIGN KEY ("riotLeagueChampionId") REFERENCES "RiotLeagueChampion" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RiotLeagueChampion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "championId" INTEGER NOT NULL,
    "championName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RiotLeagueMatchParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "summonerPuuid" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "championId" INTEGER NOT NULL,
    CONSTRAINT "RiotLeagueMatchParticipant_summonerPuuid_fkey" FOREIGN KEY ("summonerPuuid") REFERENCES "RiotSummoner" ("summonerPuuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RiotLeagueMatchParticipant_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "RiotLeagueMatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RiotLeagueMatchParticipant_championId_fkey" FOREIGN KEY ("championId") REFERENCES "RiotLeagueChampion" ("championId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordUser_discordId_key" ON "DiscordUser"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordGuild_discordId_key" ON "DiscordGuild"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "RiotSummoner_accountId_key" ON "RiotSummoner"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "RiotSummoner_summonerName_key" ON "RiotSummoner"("summonerName");

-- CreateIndex
CREATE UNIQUE INDEX "RiotSummoner_summonerPuuid_key" ON "RiotSummoner"("summonerPuuid");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueQueue_queueId_key" ON "RiotLeagueQueue"("queueId");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueQueue_queueName_key" ON "RiotLeagueQueue"("queueName");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueGameMode_gameMode_key" ON "RiotLeagueGameMode"("gameMode");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueMatch_matchId_key" ON "RiotLeagueMatch"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueChampion_championId_key" ON "RiotLeagueChampion"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "RiotLeagueChampion_championName_key" ON "RiotLeagueChampion"("championName");

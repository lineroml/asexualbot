import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { getChampionData, getAllChampionData } from './../src/riot/ddragon';

const prisma = new PrismaClient();

getAllChampionData().then((champions) => {
  const championData = champions;
  Object.entries(championData).forEach(([key, value]: [string, any]) => {
    prisma.riotLeagueChampion
      .create({
        data: {
          championId: parseInt(value.key),
          championName: key,
          championVerboseName: value.name,
        },
      })
      .then((champion) => {
        console.log(champion);
      });
  });
});

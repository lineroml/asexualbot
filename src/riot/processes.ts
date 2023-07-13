import { SummonerDTO } from './summoner/types';
import { getSummonerByName } from './summoner/requests';
import { PrismaClient, RiotSummoner } from '@prisma/client';

const prisma = new PrismaClient();

export const updateSummonerData = async (summonerName: string) => {
  const summonerDTO: SummonerDTO = await getSummonerByName(summonerName);
  if (summonerDTO) {
    const summoner = await prisma.riotSummoner.update({
      where: {
        summonerPuuid: summonerDTO.puuid,
      },
      data: {
        summonerLevel: summonerDTO.summonerLevel,
        summonerName: summonerDTO.name,
        updatedAt: new Date(),
      },
    });
    return summoner;
  }
};

export const getSummonerData = async (summonerName: string) => {
  const summoner = await prisma.riotSummoner.findUnique({
    where: {
      summonerName: summonerName,
    },
  });

  if (summoner) {
    // check if it was updated in the last 2 hours
    const now = new Date();
    const lastUpdated = summoner.updatedAt;
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    if (diffHours > 2) {
      const updatedSummoner = await updateSummonerData(summonerName);
      return updatedSummoner;
    }
    return summoner;
  }
};

export const getSummonerDataByPuuid = async (puuid: string) => {
  const summoner = await prisma.riotSummoner.findUnique({
    where: {
      summonerPuuid: puuid,
    },
  });

  if (summoner) {
    const now = new Date();
    const lastUpdated = summoner.updatedAt;
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    if (diffHours > 2) {
      const updatedSummoner = await updateSummonerData(summoner.summonerName);
      return updatedSummoner;
    }
    return summoner;
  }
};

export const refreshSummonerMatches = async (summonerName: string) => {};

import { SummonerDTO } from './types';
import dotenv from 'dotenv';

const REGION_CODE = process.env.RIOT_SERVER_REGION || 'la1';
const AREA_CODE = process.env.RIOT_AREA_CODE || 'americas';
const API_KEY = process.env.RIOT_API_KEY;

export const getSummonerByName = async (summonerName: string): Promise<SummonerDTO> => {
  // Make sure to escape the summoner name
  const fixedSummonerName = encodeURI(summonerName);
  const url = `https://${REGION_CODE}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${fixedSummonerName}?api_key=${API_KEY}`;

  console.log(`Fetching summoner ${summonerName} from ${url}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const summoner: SummonerDTO = await response.json();
  console.log(`Summoner ${summonerName} fetched successfully!`);

  return summoner;
};

export const getSummonerByPuuid = async (puuid: string): Promise<SummonerDTO> => {
  const url = `https://${REGION_CODE}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`;

  console.log(`Fetching summoner ${puuid} from ${url}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const summoner: SummonerDTO = await response.json();
  console.log(`Summoner ${summoner.name} fetched successfully!`);

  return summoner;
};

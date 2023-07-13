import { MatchDTO } from './types';

const REGION_CODE = process.env.RIOT_SERVER_REGION || 'la1';
const AREA_CODE = process.env.RIOT_AREA_CODE || 'americas';
const API_KEY = process.env.RIOT_API_KEY;

export const getPlayerMatches = async (puuid: string): Promise<string[]> => {
  const url = `https://${AREA_CODE}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const matches: string[] = await response.json();
  return matches;
};

export const getMatchById = async (matchId: string): Promise<MatchDTO> => {
  const url = `https://${AREA_CODE}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const match: MatchDTO = await response.json();
  return match;
};

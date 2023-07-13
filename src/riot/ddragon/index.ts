const DDRAGON_BASE_URL = 'http://ddragon.leagueoflegends.com';
const LANGUAGE = process.env.RIOT_LANGUAGE_CODE || 'es_ES';
const VERSION = process.env.RIOT_CURRENT_VERSION || '13.13.1';

export const getAllChampionData = async () => {
  const url = `${DDRAGON_BASE_URL}/cdn/${VERSION}/data/${LANGUAGE}/champion.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const champions = await response.json();
  return champions.data;
};

export const getChampionData = async (version: string, championName: string) => {
  const url = `${DDRAGON_BASE_URL}/cdn/${version}/data/${LANGUAGE}/champion/${encodeURI(
    championName
  )}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const champion = await response.json();
  return champion.data[championName];
};

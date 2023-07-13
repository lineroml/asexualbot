import { SlashCommandSubcommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getSummonerByName } from '../../riot/summoner/requests';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = new SlashCommandSubcommandBuilder()
  .setName('invocador')
  .setDescription('Proporciona información sobre un invocador.')
  .addStringOption((option) =>
    option.setName('nombre').setDescription('Nombre del invocador.').setRequired(true)
  );

const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });
  const summonerName = interaction.options.getString('nombre', true);
  await interaction.editReply(`Buscando invocador ${summonerName}...`);
  const summoner = await getSummonerByName(summonerName);
  await interaction.editReply(
    `El invocador ${summoner.name} tiene nivel ${summoner.summonerLevel}.`
  );
};

const getSummonerData = async (summonerName: string) => {
  const summoner = await prisma.riotSummoner.findUnique({
    where: {
      summonerName: summonerName,
    },
  });

  if (summoner) {
    // check if it was updated in the last 24 hours
    const now = new Date();
    const lastUpdated = summoner.updatedAt;
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    if (diffHours > 24) {
      const updatedSummoner = await getSummonerByName(summonerName);
      await prisma.riotSummoner.update({
        where: {
          summonerName: summonerName,
        },
        data: {
          summonerLevel: updatedSummoner.summonerLevel,
          updatedAt: new Date(),
        },
      });
      return updatedSummoner;
    }
    return summoner;
  } else {
    const summoner = await getSummonerByName(summonerName);
    await prisma.riotSummoner.create({
      data: {
        summonerName: summoner.name,
        summonerPuuid: summoner.puuid,
        summonerLevel: summoner.summonerLevel,
        accountId: summoner.accountId,
        profileIconId: summoner.profileIconId,
      },
    });
    return summoner;
  }
};

export default { data, execute };

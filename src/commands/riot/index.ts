import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import SummonerCommand from './summoner';

const subcommands: { data: SlashCommandSubcommandBuilder; execute: Function }[] = [SummonerCommand];

export default {
  data: {
    name: 'riot',
    description: 'Comandos relacionados con Riot.',
  },
  subcommands: subcommands.map((subcommand) => subcommand.data),
  execute: async (interaction: ChatInputCommandInteraction) => {
    for (const subcommand of subcommands) {
      if (subcommand.data.name === interaction.options.getSubcommand()) {
        await subcommand.execute(interaction);
        break;
      }
    }
  },
};

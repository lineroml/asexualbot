import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Provides information about the server.');

const execute = async (interaction: CommandInteraction) => {
  await interaction.reply(
    `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
  );
};

export default { data, execute };

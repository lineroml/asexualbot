import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Provides information about the user.');

const execute = async (interaction: CommandInteraction) => {
  await interaction.reply(
    `This command was run by ${interaction?.user?.username}, whose roles are ${interaction?.member?.roles}.`
  );
};

export default { data, execute };

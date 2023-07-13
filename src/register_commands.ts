import { REST, Routes, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const config = {
  token: process.env.DISCORD_TOKEN || '',
  clientId: process.env.DISCORD_DEV_CLIENT || '',
  guildId: process.env.DISCORD_DEV_GUILD || '',
};

const commands: { name: string; description: string }[] = [];

// fetch all files in commands folder. For each file, import the data and add it to the commands array.
fs.readdirSync('dist/commands').forEach((file) => {
  // if there is a subfolder, fetch all files in that subfolder. For each file, import the data and add it to the commands array.
  if (fs.lstatSync(`dist/commands/${file}`).isDirectory()) {
    console.log(`Loading commands from ${file} folder`);
    const command = require(`./commands/${file}/index`);
    const folderCommand: SlashCommandBuilder = new SlashCommandBuilder()
      .setName(command.default.data.name)
      .setDescription(command.default.data.description);
    command.default.subcommands.forEach((subcommand: SlashCommandSubcommandBuilder) => {
      folderCommand.addSubcommand(subcommand);
    });
    commands.push(folderCommand.toJSON());
    console.log(
      `Loaded command ${command.default.data.name} from ${file} folder (${command.default.subcommands.length} subcommands)`
    );
    command.default.subcommands.forEach((subcommand: SlashCommandSubcommandBuilder) => {
      console.log(`\tLoaded subcommand ${subcommand.name} from ${file} folder`);
    });
  }
  if (!file.endsWith('.js')) return;

  const command = require(`./commands/${file}`);
  console.log(`Loaded command ${command.default.data.name} from ${file}`);
  commands.push(command.default.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(config.token);

try {
  console.log('Started refreshing application (/) commands.');

  // If command line argument "guild" is provided, only register commands for that guild.
  if (process.argv.find((arg) => arg === '--dev')) {
    rest
      .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: commands,
      })
      .then(() => console.log('Successfully reloaded application (/) commands for guild.'));
  } else {
    rest
      .put(Routes.applicationCommands(config.clientId), {
        body: commands,
      })
      .then(() => console.log('Successfully reloaded application (/) commands.'));
  }
} catch (error) {
  console.error(error);
}

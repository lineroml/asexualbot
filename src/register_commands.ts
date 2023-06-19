import { REST, Routes } from 'discord.js';
import config from './../config.json';
import fs from 'fs';

const commands: { name: string; description: string }[] = [];

// fetch all files in commands folder. For each file, import the data and add it to the commands array.
fs.readdirSync('dist/src/commands').forEach((file) => {
  if (!file.endsWith('.js')) return;
  const command = require(`./commands/${file}`);

  commands.push({
    name: command.default.data.name,
    description: command.default.data.description,
  });
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

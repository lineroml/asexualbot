// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, BaseInteraction } from 'discord.js';
import { token } from './../config.json';
import ping from './commands/ping';
import server from './commands/server';
import user from './commands/user';

type Command = {
  name: string;
  run: Function;
};

// Create a new client instance
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands: Command[] = [
  {
    name: ping.data.name,
    run: ping.execute,
  },
  {
    name: server.data.name,
    run: server.execute,
  },
  {
    name: user.data.name,
    run: user.execute,
  },
];

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
  if (!interaction.isCommand()) return;

  const command = commands.find((c: Command) => c.name === interaction.commandName);
  if (!command) return;
  command.run(interaction);
});

// Log in to Discord with your client's token
client.login(token);

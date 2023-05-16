import { config } from "dotenv";
import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import fs from "fs";
config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.TOKEN);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  client.commands = new Collection();
  client.buttons = new Collection();
  client.modals = new Collection();

  const controllers = fs
    .readdirSync("./src/controllers")
    .filter((file) => file.endsWith(".js"));
  const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));
  const commandFolders = fs.readdirSync("./src/commands");
  (async () => {
    for (const file of controllers) {
      const module = await import(`./controllers/${file}`);
      module.default(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands");
    client.handleButtons();
    client.handleModals();
  })();
});

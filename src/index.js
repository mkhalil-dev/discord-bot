import { config } from "dotenv";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { REST } from "@discordjs/rest";
config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.login(process.env.TOKEN);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

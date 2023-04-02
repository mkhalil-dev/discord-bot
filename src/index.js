import { config } from "dotenv";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { REST } from "@discordjs/rest";
import { db } from "./db/db.js";
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
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const members = guild.members.cache;
  const roles = guild.roles.cache;
  console.log(`Members: ${members.size} | Roles: ${roles.size}`);
  members.forEach((member) => {
    member._roles.includes("1092068511515422862") &&
      db.data.posts.push({ id: member.id, name: member.user.username });
  });
  db.write();
});

client.on(Events.MessageCreate, (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

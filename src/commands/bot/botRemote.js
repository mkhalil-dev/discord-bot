import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
  ButtonStyle,
  AttachmentBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("botremote")
    .setDescription(
      "Prompt buttons for users to control their bots remotely.."
    ),
  async execute(interaction) {
    const file = new AttachmentBuilder("src/assets/images/botbanner.png");
    const embed = new EmbedBuilder()
      .setColor("#0074ba")
      .setTitle("🔷 Bot Remote")
      .setDescription(
        `
                **Click** the **buttons** below to **start**:\n\n
                If you don't know how to use these controls please **click** the **button** below to **watch** a **video** on how to use them.\n\n`
      )
      .setImage("attachment://botbanner.png");
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("start")
        .setLabel("Start")
        .setStyle(ButtonStyle.Success)
        .setEmoji("▶️"),
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("⏹️")
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("create")
        .setLabel("Create Tasks")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("📝"),
      new ButtonBuilder()
        .setCustomId("delete")
        .setLabel("Delete Tasks")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🗑️"),
      new ButtonBuilder()
        .setCustomId("help")
        .setLabel("Help")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("❓")
    );
    await interaction.reply({
      embeds: [embed],
      components: [row],
      files: [file],
    });
  },
};

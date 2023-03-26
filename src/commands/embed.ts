import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('embed').setDescription('creates a button'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setCustomId('createEmbed').setLabel('Create an Embed!').setStyle(ButtonStyle.Primary)
    )

    interaction.reply({ content: 'create embed', ephemeral: true, components: [row] })

    // const embed = new EmbedBuilder()
    //   .setColor(0x0099ff)
    //   .setTitle('Some title')
    //   .setURL('https://discord.js.org')
    //   .setDescription('Some description here')

    // await interaction.reply({ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] })
  },
}

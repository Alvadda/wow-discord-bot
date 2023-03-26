import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('button').setDescription('creates a button'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    // const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    //   new ButtonBuilder().setCustomId('primary').setLabel('Click me!').setStyle(ButtonStyle.Primary)
    // )

    // await interaction.reply({ content: 'I think you should,', components: [row] })

    // const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    //   new ButtonBuilder().setCustomId('primary').setLabel('Click me!').setStyle(ButtonStyle.Primary).setEmoji('123456789012345678')
    // )

    // const embed = new EmbedBuilder()
    //   .setColor(0x0099ff)
    //   .setTitle('Some title')
    //   .setURL('https://discord.js.org')
    //   .setDescription('Some description here')

    // await interaction.reply({ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] })

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Nothing selected').addOptions(
        {
          label: 'Select me',
          description: 'This is a description',
          value: 'first_option',
        },
        {
          label: 'You can select me too',
          description: 'This is also a description',
          value: 'second_option',
        }
      )
    )

    await interaction.reply({ content: 'Pong!', components: [row] })
  },
}

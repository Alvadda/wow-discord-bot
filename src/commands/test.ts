import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, TextChannel } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Testing the bot')
    .addStringOption((option) => option.setName('input').setDescription('echo').setRequired(true))
    .addChannelOption((option) => option.setName('channel').setDescription('channel to echo'))
    .addBooleanOption((option) => option.setName('ephemeral').setDescription('Whether or not the echo should be ephemeral'))
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('The gif category')
        .addChoices({ name: 'Funny', value: 'gif_funny' }, { name: 'Meme', value: 'gif_meme' }, { name: 'Movie', value: 'gif_movie' })
    ),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const input = interaction.options.getString('input')!
    const channel = interaction.options.getChannel('channel')
    const ephemeral = Boolean(interaction.options.getBoolean('ephemeral'))
    const gifCategory = interaction.options.getString('category') ?? 'no category selected'

    await interaction.reply({ content: `Echo "${input}"`, ephemeral })

    if (channel && 'send' in channel) {
      await channel.send(`test in channel ${gifCategory}`)
    }
  },
}

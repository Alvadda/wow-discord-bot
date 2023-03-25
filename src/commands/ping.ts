import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    console.log(interaction)
    await interaction.reply('Pong!')
  },
}

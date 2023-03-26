import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface SlashCommand {
  data: any
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => void
}

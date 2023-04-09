import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js'
import { getSpecs, getClasses, getFactions, getServers } from '../db/get'

// todo create a sequenc of questions for the creations
export const createChar = async () => {
  const [specs, classes, factions, server] = await Promise.all([getSpecs(), getClasses(), getFactions(), getServers()])

  const specsOptions = specs.map((s) => ({ name: s.name, value: s.id }))
  return {
    data: new SlashCommandBuilder()
      .setName('create_char')
      .setDescription('Creates a char for your user')
      .addStringOption((option) => option.setName('char_name').setDescription('The name of your Char').setRequired(true))
      .addStringOption((option) =>
        option
          .setName('class')
          .setDescription('The class your char has')
          .addChoices(...classes.map((c) => ({ name: c.name, value: c.id })))
      )
      .addStringOption((option) =>
        option
          .setName('main_spec')
          .setDescription('The main spec your char has')
          .addChoices(...specsOptions)
      )
      .addStringOption((option) =>
        option
          .setName('off_spec')
          .setDescription('The off spec your char has')
          .addChoices(...specsOptions)
      )
      .addStringOption((option) =>
        option
          .setName('server')
          .setDescription('On what Server your char is')
          .addChoices(...server.map((s) => ({ name: s.name, value: s.id })))
      )
      .addStringOption((option) =>
        option
          .setName('fraction')
          .setDescription('The off spec your char has')
          .addChoices(...factions.map((f) => ({ name: f.name, value: f.id })))
      ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
      interaction.deferReply()
      interaction.reply('created...')
    },
  }
}

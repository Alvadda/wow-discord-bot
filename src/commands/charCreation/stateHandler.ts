import { ActionRowBuilder, DMChannel, EmbedBuilder } from 'discord.js'
import { getCharByName, getClasses } from '../../db/get'

export const handleCharName = {
  async init(dmChannel: DMChannel) {
    const NameEmbed = new EmbedBuilder()
      .setTitle('Create a new character')
      .setDescription('Please enter a name for your character')
      .setColor('Blue')
    await dmChannel.send({ embeds: [NameEmbed] })
  },
  async handle(dmChannel: DMChannel, name: string, next: () => void) {
    const charExists = await getCharByName(name)

    if (charExists) {
      await dmChannel.send('Sorry, that character name is already taken. Please enter a different name.')
      return
    }

    next()
    return name
  },
}

export const handleCharClass = {
  async init(dmChannel: DMChannel) {
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

    const NameEmbed = new EmbedBuilder()
      .setTitle('Create a new character')
      .setDescription('Please select a class for your character')
      .setColor('Blue')
    await dmChannel.send({ embeds: [NameEmbed] })
  },
  async handle(dmChannel: DMChannel, name: string, next: () => void) {
    const charExists = await getCharByName(name)

    if (charExists) {
      await dmChannel.send('Sorry, that character name is already taken. Please enter a different name.')
      return
    }

    next()
    return name
  },
}

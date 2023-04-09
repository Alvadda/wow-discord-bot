import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js'
import { getCharByName, getClasses, getSpecsForClass } from '../db/get'

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const char = {
      name: '',
      class: '',
      spec: '',
    }
    const dmChannel = await interaction.user.createDM()
    const NameEmbed = new EmbedBuilder()
      .setTitle('Create a new character')
      .setDescription('Please enter a name for your character')
      .setColor('Blue')
    await dmChannel.send({ embeds: [NameEmbed] })

    const nameCollector = dmChannel.createMessageCollector({
      filter: (msg) => msg.author.id === interaction.user.id,
      time: 60000,
    })

    nameCollector.on('collect', async (msg) => {
      const charName = msg.content

      const charExists = await getCharByName(charName)
      if (charExists) {
        await dmChannel.send('Sorry, that character name is already taken. Please enter a different name.')
        nameCollector.resetTimer()
      } else {
        char.name = charName
        const classes = await getClasses()
        const classEmbed = new EmbedBuilder().setTitle('Select the class for your character').setColor('Blue')
        const classRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('class_selection')
            .setPlaceholder('select your class...')
            .addOptions(
              ...classes.map((c) => ({
                label: c.name,
                value: c.id,
              }))
            )
        )
        await dmChannel.send({ embeds: [classEmbed], components: [classRow] })

        const classCollector = dmChannel.createMessageComponentCollector({
          filter: (i) => i.user.id === interaction.user.id && i.customId === 'class_selection',
          max: 1,
          time: 60000,
        })

        classCollector.on('collect', async (i: StringSelectMenuInteraction<CacheType>) => {
          const selectedClassId = i.values[0]
          const specsForClass = await getSpecsForClass(selectedClassId)

          char.class = specsForClass[0].class.name

          await i.update({
            embeds: [new EmbedBuilder().setTitle(`You selected ${specsForClass[0].class.name}`).setColor('Blue')],
            components: [],
          })

          const specEmbed = new EmbedBuilder().setTitle('Select the spec for your character').setColor('Blue')
          const specRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('spec_selection')
              .setPlaceholder('select your spec...')
              .addOptions(
                ...specsForClass.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))
              )
          )
          await dmChannel.send({ embeds: [specEmbed], components: [specRow] })

          const specCollector = dmChannel.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'spec_selection',
            max: 1,
            time: 60000,
          })

          specCollector.on('collect', async (i: StringSelectMenuInteraction<CacheType>) => {
            const selectedSpecId = i.values[0]

            const spec = specsForClass.find((s) => s.id === selectedSpecId)
            char.spec = spec?.name ?? ''

            await i.update({
              embeds: [new EmbedBuilder().setTitle(`You selected ${spec?.name}`).setColor('Blue')],
              components: [],
            })

            dmChannel.send(`You Created Char ${char.name} with the class: ${char.class} and the spec: ${char.spec}`)
            specCollector.stop()
          })

          classCollector.stop()
        })

        nameCollector.stop()
      }
    })

    await interaction.reply('Check your DMs!')
  },
}

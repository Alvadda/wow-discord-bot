import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ComponentType,
} from 'discord.js'

import { getCharByName } from '../../db/get'

const INTERACTIONS = {
  SELECT_ClASS: 'select-class',
  SELECT_MAIN_SPEC: 'select-main-spec',
  SELECT_OFF_SPEC: 'select-off-spec',
  SELECT_SERVER: 'select-server',
  SELECT_FRACTION: 'select-fraction',
}

const classRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder().setCustomId(INTERACTIONS.SELECT_ClASS).setPlaceholder('Select a class').addOptions(
    {
      label: 'Class 1',
      description: 'This is a description',
      value: 'class1',
    },
    {
      label: 'Class 2',
      description: 'This is also a description',
      value: 'class2',
    }
  )
)
const selectClassMessage = {
  embeds: [new EmbedBuilder().setDescription('Please select your class.')],
  components: [classRow],
}

const mainSpecRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder().setCustomId(INTERACTIONS.SELECT_MAIN_SPEC).setPlaceholder('Select a your main spec').addOptions(
    {
      label: 'MS 1',
      description: 'This is a description',
      value: 'ms1',
    },
    {
      label: 'MS 2',
      description: 'This is also a description',
      value: 'ms2',
    }
  )
)
const selectMainSpecMessage = {
  embeds: [new EmbedBuilder().setDescription('Please select main spec.')],
  components: [mainSpecRow],
}

const offSpecRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder().setCustomId(INTERACTIONS.SELECT_OFF_SPEC).setPlaceholder('Select a your off spec').addOptions(
    {
      label: 'OS 1',
      description: 'This is a description',
      value: 'os1',
    },
    {
      label: 'OS 2',
      description: 'This is also a description',
      value: 'os2',
    }
  )
)
const selectOffSpecMessage = {
  embeds: [new EmbedBuilder().setDescription('Please select off spec.')],
  components: [offSpecRow],
}

const serverRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder().setCustomId(INTERACTIONS.SELECT_SERVER).setPlaceholder('Select a your server').addOptions(
    {
      label: 'Server 1',
      description: 'This is a description',
      value: 'server1',
    },
    {
      label: 'Server 2',
      description: 'This is also a description',
      value: 'server2',
    }
  )
)
const selectServerMessage = {
  embeds: [new EmbedBuilder().setDescription('Please select a server.')],
  components: [serverRow],
}

const fractionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
  new StringSelectMenuBuilder().setCustomId(INTERACTIONS.SELECT_FRACTION).setPlaceholder('Select a your fraction').addOptions(
    {
      label: 'Fraction 1',
      description: 'This is a description',
      value: 'fraction1',
    },
    {
      label: 'Fraction 2',
      description: 'This is also a description',
      value: 'fraction2',
    }
  )
)
const selectFractionMessage = {
  embeds: [new EmbedBuilder().setDescription('Please select a fraction.')],
  components: [fractionRow],
}

export default {
  data: new SlashCommandBuilder().setName('create_char').setDescription('Create a new character'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const dmChannel = await interaction.user.createDM()
    // const state = charState(dmChannel)
    const char: any = {}

    const dmCollector = dmChannel.createMessageCollector({
      filter: (msg) => msg.author.id === interaction.user.id,
      time: 30000,
    })

    const nameEmbed = new EmbedBuilder().setTitle('Create a new character').setDescription('Please enter a name for your character')
    await dmChannel.send({ embeds: [nameEmbed] })

    dmCollector.on('collect', async (msg) => {
      const selectCollector = dmChannel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 })
      const { content } = msg

      // Select Char Name
      const charExists = await getCharByName(content)
      if (charExists) {
        dmChannel.send('Sorry, that character name is already taken. Please enter a different name.')
        return
      }
      char.name = content

      // Select Char Class
      await dmChannel.send(selectClassMessage)

      selectCollector.on('collect', async (selectInteraction) => {
        if (selectInteraction.user.id !== interaction.user.id) return

        switch (selectInteraction.customId) {
          case INTERACTIONS.SELECT_ClASS:
            char.class = selectInteraction.values[0]
            await selectInteraction.update({ content: `You Selected ${char.class}`, components: [], embeds: [] })
            await dmChannel.send(selectMainSpecMessage)
            break
          case INTERACTIONS.SELECT_MAIN_SPEC:
            char.ms = selectInteraction.values[0]
            await selectInteraction.update({ content: `You Selected ${char.ms}`, components: [], embeds: [] })
            await dmChannel.send(selectOffSpecMessage)
            break
          case INTERACTIONS.SELECT_OFF_SPEC:
            char.os = selectInteraction.values[0]
            await selectInteraction.update({ content: `You Selected ${char.os}`, components: [], embeds: [] })
            await dmChannel.send(selectServerMessage)
            break
          case INTERACTIONS.SELECT_SERVER:
            char.server = selectInteraction.values[0]
            await selectInteraction.update({ content: `You Selected ${char.server}`, components: [], embeds: [] })
            await dmChannel.send(selectFractionMessage)
            break
          case INTERACTIONS.SELECT_FRACTION:
            char.fraction = selectInteraction.values[0]
            await selectInteraction.update({ content: `You Selected ${char.fraction}`, components: [], embeds: [] })
            break
          default:
            break
        }

        console.log(char)
      })

      // const charName = msg.content

      // nameCollector.stop()
    })

    await interaction.reply('Check your DMs!')
  },
}

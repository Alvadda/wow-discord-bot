import { Client, Events, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

import { commands } from './commands'
import { DISCORD_BOT_TOKEN } from './config'
import { ready, interactionCreate } from './events'
import { SlashCommand } from './types'
import { prisma } from './lib/primsa'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>
  }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildEmojisAndStickers] })
client.commands = new Collection()

commands.forEach((command) => client.commands.set(command.data.name, command))

client.once(Events.ClientReady, ready)

client.on(Events.InteractionCreate, interactionCreate)

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'createEmbed') {
      const embedsChannel = client.channels.cache.get('1089517212475330562')
      if (embedsChannel && 'send' in embedsChannel) {
        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle('Some title')
          .setURL('https://discord.js.org')
          .setDescription('Some description here')
          .addFields({ name: 'title', value: '1' })

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder().setCustomId('updateEmbed').setLabel('Update').setStyle(ButtonStyle.Primary)
        )
        await embedsChannel.send({ embeds: [embed], components: [row] })
      }
    }

    if (interaction.customId === 'updateEmbed') {
      await interaction.deferUpdate()
      const message = interaction.message

      console.log(interaction.client.emojis.cache.values())

      const receivedEmbed = message.embeds[0]
      const exampleEmbed = EmbedBuilder.from(receivedEmbed).addFields({
        name: 'title',
        value: `<:war_ms:1089535564002373643> t1 \n t2 \n t3 \n t4`,
        // value: 'test',
      })
      interaction
      await message.edit({ embeds: [exampleEmbed] })
    }
  }

  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'select') {
      await interaction.update({ content: 'Something was selected!', components: [] })
    }
  }
})

client.login(DISCORD_BOT_TOKEN)
;(async () => {
  const server = await prisma.server.findMany({
    where: {
      region: { name: 'eu' },
    },
    include: { region: true },
  })

  console.log('server', server)
})()

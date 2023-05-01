import { Client, Events, GatewayIntentBits, Collection } from 'discord.js'

import { commands } from './commands'
import { DISCORD_BOT_TOKEN } from './config'
import { ready, interactionCreate } from './events'
import { SlashCommand } from './types'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.DirectMessages],
})
client.commands = new Collection()

commands.forEach((command) => client.commands.set(command.data.name, command))

client.once(Events.ClientReady, ready)
client.on(Events.InteractionCreate, interactionCreate)
client.login(DISCORD_BOT_TOKEN)

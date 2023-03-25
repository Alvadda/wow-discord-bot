import { SlashCommand } from './types'
import * as dotenv from 'dotenv'
dotenv.config()

import { Client, Events, GatewayIntentBits, Collection } from 'discord.js'

import { commands } from './commands'
import { DISCORD_BOT_TOKEN } from './config'
import { ready, interactionCreate } from './events'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>
  }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

commands.forEach((command) => client.commands.set(command.data.name, command))

client.once(Events.ClientReady, ready)

client.on(Events.InteractionCreate, interactionCreate)

client.login(DISCORD_BOT_TOKEN)

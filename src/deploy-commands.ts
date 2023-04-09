import { REST, Routes } from 'discord.js'

import { commands } from './commands'
import { CLIENT_ID, DISCORD_BOT_TOKEN, GUILD_ID } from './config'
const commandJSONPromises = commands.map(async (command) => (await command).data.toJSON())

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN)

// and deploy your commands!
;(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)
    const commandJSONs = await Promise.all(commandJSONPromises)
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commandJSONs })) as any

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()

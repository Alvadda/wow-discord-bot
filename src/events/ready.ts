import { Client } from 'discord.js'

export const ready = (client: Client<true>) => console.log(`Ready! Logged in as ${client.user.tag}`)

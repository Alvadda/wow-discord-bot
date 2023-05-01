import { ActionRowBuilder, EmbedBuilder, MessageCreateOptions, StringSelectMenuBuilder } from 'discord.js'
import { getClasses, getFactions, getRegion, getServers, getServersByRegion, getSpecsForClass } from '../../db/get'

export const INTERACTIONS = {
  SELECT_ClASS: 'select-class',
  SELECT_MAIN_SPEC: 'select-main-spec',
  SELECT_OFF_SPEC: 'select-off-spec',
  SELECT_REGION: 'select-region',
  SELECT_SERVER: 'select-server',
  SELECT_FACTION: 'select-faction',
}

export const getSelectClassMessage = async (): Promise<MessageCreateOptions> => {
  const classes = await getClasses()

  const classRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_ClASS)
      .setPlaceholder('Select a class')
      .addOptions(
        classes.map((c) => ({
          label: c.name,
          value: c.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your class.')],
    components: [classRow],
  }
}

export const getSelectMainSpecMessage = async (classId: string): Promise<MessageCreateOptions> => {
  const specs = await getSpecsForClass(classId)

  const specRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_MAIN_SPEC)
      .setPlaceholder('Select a your main spec')
      .addOptions(
        specs.map((s) => ({
          label: s.name,
          value: s.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your main spec.')],
    components: [specRow],
  }
}

export const getSelectOffSpecMessage = async (classId: string): Promise<MessageCreateOptions> => {
  const specs = await getSpecsForClass(classId)

  const specRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_OFF_SPEC)
      .setPlaceholder('Select a your off spec')
      .addOptions(
        specs.map((s) => ({
          label: s.name,
          value: s.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your off spec.')],
    components: [specRow],
  }
}

export const getSelectRegionMessage = async (): Promise<MessageCreateOptions> => {
  const regions = await getRegion()

  const regionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_REGION)
      .setPlaceholder('Select a your region')
      .addOptions(
        regions.map((r) => ({
          label: r.name,
          value: r.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your region.')],
    components: [regionRow],
  }
}

export const getSelectServerMessage = async (regionId: string): Promise<MessageCreateOptions> => {
  const servers = await getServersByRegion(regionId)

  const serverRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_SERVER)
      .setPlaceholder('Select a your server')
      .addOptions(
        servers.map((s) => ({
          label: s.name,
          value: s.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your server.')],
    components: [serverRow],
  }
}

export const getSelectFractionMessage = async (): Promise<MessageCreateOptions> => {
  const fractions = await getFactions()

  const fractionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_FACTION)
      .setPlaceholder('Select a your fraction')
      .addOptions(
        fractions.map((f) => ({
          label: f.name,
          value: f.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your fraction.')],
    components: [fractionRow],
  }
}

export const getConfirmMessage = async (): Promise<MessageCreateOptions> => {
  const fractions = await getFactions()

  const fractionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(INTERACTIONS.SELECT_FACTION)
      .setPlaceholder('Select a your fraction')
      .addOptions(
        fractions.map((f) => ({
          label: f.name,
          value: f.id,
        }))
      )
  )

  return {
    embeds: [new EmbedBuilder().setDescription('Please select your fraction.')],
    components: [fractionRow],
  }
}

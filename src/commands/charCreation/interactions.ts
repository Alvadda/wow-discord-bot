import { ActionRowBuilder, BaseMessageOptions, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js'
import { getClasses, getFactions, getRegion, getServersByRegion, getSpecsForClass } from '../../db/get'
import { Character } from './charBuilder'

export const INTERACTIONS = {
  CONFIRM: 'confirm',
  SELECT_ClASS: 'select-class',
  SELECT_MAIN_SPEC: 'select-main-spec',
  SELECT_OFF_SPEC: 'select-off-spec',
  SELECT_REGION: 'select-region',
  SELECT_SERVER: 'select-server',
  SELECT_FACTION: 'select-faction',
}

export const getSelectClassMessage = async (): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your class.').setColor('Green')],
    components: [classRow],
  }
}

export const getSelectMainSpecMessage = async (classId: string): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your main spec.').setColor('Green')],
    components: [specRow],
  }
}

export const getSelectOffSpecMessage = async (classId: string): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your off spec.').setColor('Green')],
    components: [specRow],
  }
}

export const getSelectRegionMessage = async (): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your region.').setColor('Green')],
    components: [regionRow],
  }
}

export const getSelectServerMessage = async (regionId: string): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your server.').setColor('Green')],
    components: [serverRow],
  }
}

export const getSelectFractionMessage = async (): Promise<BaseMessageOptions> => {
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
    embeds: [new EmbedBuilder().setDescription('Please select your fraction.').setColor('Green')],
    components: [fractionRow],
  }
}

export const getConfirmMessage = async (character: Character): Promise<BaseMessageOptions> => {
  const confirmRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId(INTERACTIONS.CONFIRM).setLabel('Confirm Character').setStyle(ButtonStyle.Success)
  )

  const charEmbed = new EmbedBuilder()
    .setTitle(`Confirm your character`)
    .addFields(
      { name: 'Name', value: character.name ?? '' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Class', value: character.class?.name ?? '' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Main Spec', value: character.mainSpec?.name ?? '', inline: true },
      { name: 'Off Spec', value: character.offSpec?.name ?? '', inline: true },
      { name: '\u200B', value: '\u200B' },
      { name: 'Faction', value: character.faction?.name ?? '', inline: true },
      { name: 'Server', value: character.server?.name ?? '', inline: true }
    )
    .setColor('Green')

  return {
    embeds: [charEmbed],
    components: [confirmRow],
  }
}

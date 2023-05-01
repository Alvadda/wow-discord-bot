import { prisma } from '../lib/primsa'

export const getSpecs = async () => prisma.specialization.findMany()
export const getServers = async () => prisma.server.findMany()
export const getRegion = async () => prisma.region.findMany()
export const getClasses = async () => prisma.class.findMany()
export const getFactions = async () => prisma.faction.findMany()
export const getCommunities = async () => prisma.community.findMany()
export const getRaids = async () => prisma.raid.findMany()

export const getCharByName = async (name: string) => prisma.character.findFirst({ where: { name } })
export const getSpecsForClass = async (classId: string) => prisma.specialization.findMany({ where: { classId }, include: { class: true } })
export const getServersByRegion = async (regionId: string) => prisma.server.findMany({ where: { regionId } })

export const getClassById = async (classId: string) => prisma.class.findFirst({ where: { id: classId } })
export const getSpecById = async (speId: string) => prisma.specialization.findFirst({ where: { id: speId }, include: { class: true } })
export const getRegionById = async (regionId: string) => prisma.region.findFirst({ where: { id: regionId } })
export const getServerById = async (serverId: string) => prisma.server.findFirst({ where: { id: serverId } })
export const getFactionById = async (factionId: string) => prisma.faction.findFirst({ where: { id: factionId } })

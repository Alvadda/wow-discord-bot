import { prisma } from '../lib/primsa'

export const getSpecs = async () => prisma.specialization.findMany()
export const getServers = async () => prisma.server.findMany()
export const getClasses = async () => prisma.class.findMany()
export const getFactions = async () => prisma.faction.findMany()
export const getCommunities = async () => prisma.community.findMany()
export const getRaids = async () => prisma.raid.findMany()

export const getCharByName = async (name: string) => prisma.character.findFirst({ where: { name } })
export const getSpecsForClass = async (classId: string) => prisma.specialization.findMany({ where: { classId }, include: { class: true } })

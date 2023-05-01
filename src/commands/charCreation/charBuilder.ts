import { Class, Server, Specialization, Faction, Region } from '@prisma/client'
import { getClassById, getFactionById, getRegionById, getServerById, getSpecById } from '../../db/get'

interface Character {
  name: string
  class: Class
  mainSpec: Specialization & { class: Class }
  offSpec: Specialization & { class: Class }
  server: Server
  region: Region
  faction: Faction
}

export const charBuilder = () => {
  const char: Partial<Character> = {}

  return {
    setName(name: string) {
      char.name = name
    },
    async setClass(classId: string) {
      char.class = (await getClassById(classId)) ?? undefined
      return char.class
    },
    async setMainSpec(specId: string) {
      char.mainSpec = (await getSpecById(specId)) ?? undefined
      return char.mainSpec
    },
    async setOffSpec(specId: string) {
      char.offSpec = (await getSpecById(specId)) ?? undefined
      return char.offSpec
    },
    async setRegion(regionId: string) {
      char.region = (await getRegionById(regionId)) ?? undefined
      return char.region
    },
    async setServer(serverId: string) {
      char.server = (await getServerById(serverId)) ?? undefined
      return char.server
    },
    async setFaction(factionId: string) {
      char.faction = (await getFactionById(factionId)) ?? undefined
      return char.faction
    },
    getCharacter() {
      return char
    },
  }
}

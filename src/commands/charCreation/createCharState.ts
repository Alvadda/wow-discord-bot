import { DMChannel } from 'discord.js'
import { handleCharName } from './stateHandler'

export const createCharState = () => {
  let state = 0

  const next = () => {
    if (state === 8) return
    state++
  }

  const prev = () => {
    if (state === 0) return
    state--
  }

  const getState = () => state

  return {
    next,
    prev,
    getState,
  }
}

const states = ['name', 'class', 'mainSpec', 'offSpec', 'server', 'fraction'] as const
export type State = (typeof states)[number]
interface Char {
  name?: string
  class?: string
  mainSpec?: string
}

export const charState = (dmChannel: DMChannel) => {
  let currentStateIndex = 0
  const char: Char = {}

  const handleState = async (dmChannel: DMChannel, msg: string) => {
    switch (states[currentStateIndex]) {
      case 'name':
        char.name = await handleCharName.handle(dmChannel, msg, next)
      case 'class':
        char.name = await handleCharName.handle(dmChannel, msg, next)
      default:
        break
    }
  }

  const handleStateChange = () => {
    switch (getCurrentState()) {
      case 'name':
        return handleCharName.init(dmChannel)

      default:
        break
    }
  }

  const next = () => {
    if (currentStateIndex >= states.length - 1) return
    currentStateIndex++
    handleStateChange()
  }

  const prev = () => {
    if (currentStateIndex <= 0) return
    currentStateIndex--
    handleStateChange()
  }

  const getCurrentState = (): State => {
    return states[currentStateIndex]
  }

  handleStateChange()

  return {
    next,
    prev,
    getCurrentState,
    handleState,
  }
}

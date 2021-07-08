import { ChatUserstate } from 'tmi.js'
import { sendAction } from './action.js'

/** Actions to perform when a new message is received */
export const onBitHandler = async (
  channel: string,
  userState: ChatUserstate,
  msg: string,
) => {
  const base = msg.trim().split(' ')

  let emote = ''
  let target = ''
  let tts = ''

  // if at least 1
  if (base.length > 0) {
    emote = base[0]
  }

  if (base.length > 1) {
    if (base[1].startsWith('@')) {
      target = base[1]
      tts = base.slice(2).join(' ')
    } else {
      tts = base.slice(1).join(' ')
    }
  }

  // ACTUAL
  if (emote.match(/^START$/)) {
    await sendAction('ringing', target, tts)
  }

  // MOCK
  if (emote.match(/^ACCEPT$/)) {
    await sendAction('answered', target, tts)
  }

  if (emote.match(/^DENY$/)) {
    await sendAction('message-bank', target, tts)
  }

  if (emote.match(/^HANG$/)) {
    await sendAction('hang', target, tts)
  }

  if (emote.match(/^RESET$/)) {
    await sendAction('reset', target, tts)
  }
}

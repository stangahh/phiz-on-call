import { sendAction } from './sendAction.js'

export const callAction = async (
  user: string,
  emote: string,
  target: string,
  tts: string,
) => {
  // ACTUAL
  if (emote.match(/^phizCall$/)) {
    await sendAction(user, 'ringing', target, tts)
  }

  // MOCK
  // if (emote.match(/^ACCEPT$/)) {
  //   await sendAction('answered', target, tts)
  // }

  // if (emote.match(/^DENY$/)) {
  //   await sendAction('message-bank', target, tts)
  // }

  // if (emote.match(/^HANG$/)) {
  //   await sendAction('hang', target, tts)
  // }

  // if (emote.match(/^RESET$/)) {
  //   await sendAction('reset', target, tts)
  // }
}

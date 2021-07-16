export const parseMessage = (msg: string) => {
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
      target = base[1].replaceAll(/@+/g, '@')
      tts = base.slice(2).join(' ')
    } else {
      tts = base.slice(1).join(' ')
    }
  }

  return {
    emote,
    target,
    tts,
  }
}

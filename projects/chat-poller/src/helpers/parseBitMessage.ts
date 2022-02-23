export const parseBitMessage = (msg: string) => {
  const base = msg.trim().split(' ')

  let target = ''
  let tts = ''

  // remove cheer from message, parse remainder to construct target and tts
  const messageParts = base.filter((part) => !part.match(/^Cheer[0-9]/g))

  if (messageParts.length > 0) {
    if (messageParts[0].startsWith('@')) {
      target = messageParts[0]
      tts = messageParts.slice(1).join(' ')
    } else {
      tts = messageParts.slice(0).join(' ')
    }
  }

  return {
    target,
    tts,
  }
}

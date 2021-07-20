export const parseBitMessage = (msg: string) => {
  const base = msg.trim().split(' ')

  let target = ''
  let tts = ''

  if (base.length > 1) {
    if (base[0].startsWith('@')) {
      target = base[0]
      tts = base.slice(1).join(' ')
    } else {
      tts = base.slice(0).join(' ')
    }
  }

  return {
    target,
    tts,
  }
}

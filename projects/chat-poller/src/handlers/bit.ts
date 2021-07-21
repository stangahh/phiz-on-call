import { ChatUserstate } from 'tmi.js'
import { parseBitMessage } from '../helpers/parseBitMessage.js'
import { getRandomNumber } from '../helpers/random.js'
import { sendAction } from '../helpers/sendAction.js'

/** Minimum number of bits to trigger an action */
const MINIMUM_BITS = 100

/** Actions to perform when a new message is received */
export const onBitHandler = async (
  channel: string,
  userState: ChatUserstate,
  msg: string,
) => {
  if (userState.bits && Number(userState.bits) < MINIMUM_BITS) return

  const { target, tts } = parseBitMessage(msg)

  // skip calling if no tts message
  if (tts === '') return

  await sendAction(
    userState.username || 'unknownUser' + getRandomNumber(),
    'ringing',
    target,
    tts,
  )
}

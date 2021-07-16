import { ChatUserstate } from 'tmi.js'
import { parseBitMessage } from '../helpers/parseBitMessage.js'
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

  if (target !== '' && tts !== '') await sendAction('ringing', target, tts)
}

import { ChatUserstate } from 'tmi.js'
import { callAction } from '../helpers/callAction.js'
import { parseMessage } from '../helpers/parseMessage.js'

/** Minimum number of bits to trigger an action */
const MINIMUM_BITS = 100

/** Actions to perform when a new message is received */
export const onBitHandler = async (
  channel: string,
  userState: ChatUserstate,
  msg: string,
) => {
  if (userState.bits && Number(userState.bits) < MINIMUM_BITS) return

  const { emote, target, tts } = parseMessage(msg)

  await callAction(emote, target, tts)
}

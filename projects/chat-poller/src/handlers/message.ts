import { ChatUserstate } from 'tmi.js'
import { callAction } from '../helpers/callAction.js'
import { parseMessage } from '../helpers/parseMessage.js'
import { getRandomNumber } from '../helpers/random.js'

/** Users who can skip the t3 check */
const GODS = ['stangahh', 'phizzi', 'thegestoord', 'mayoketchup', 'Zindurn']

/** Actions to perform when a new message is received */
export const onMessageHandler = async (
  channel: string,
  userState: ChatUserstate,
  msg: string,
  isSelf: boolean,
) => {
  if (isSelf) {
    return
  }

  const isTier3 = userState.badges?.subscriber?.startsWith('30')
  const isGod = GODS.includes(userState.username || '')

  if (!isTier3 && !isGod) {
    return
  }

  const { emote, target, tts } = parseMessage(msg)

  await callAction(
    userState.username || 'unknownUser' + getRandomNumber(),
    emote,
    target,
    tts,
  )
}

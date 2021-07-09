import { ChatUserstate } from 'tmi.js'
import { callAction } from '../helpers/callAction.js'
import { parseMessage } from '../helpers/parseMessage.js'

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

  const { emote, target, tts } = parseMessage(msg)

  await callAction(emote, target, tts)
}

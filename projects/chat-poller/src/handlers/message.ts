import { ChatUserstate } from 'tmi.js'
import { sendToClient } from '../helpers/fetch.js'
import { WebAppParams } from '../helpers/types.js'

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

  console.log('userState', userState)

  const message = msg.trim().split(' ')

  const emoteToMatch = /^COGGERS$/

  // t3
  if (message[0].match(emoteToMatch)) {
    // TODO: make sure theyre t3, early return if no

    const payload: WebAppParams = {}

    payload.action = 'ringing'

    // optionally
    if (message[1]?.startsWith('@')) {
      console.log('trigger targeted action to', message[1])
      // augment the action
      payload.action = 'ringing'
      payload.target = message[1]
    }

    await sendToClient(payload)
  }

  if (message[0].match(/STOP/)) {
    const payload: WebAppParams = {
      action: 'force-rejected',
      target: '',
    }

    await sendToClient(payload)
  }
}

import { ChatUserstate } from 'tmi.js'
import { answered } from './states/answered.js'
import { reset } from './states/default.js'
import { reject } from './states/force-rejected.js'
import { messageBank } from './states/message-bank.js'
import { incoming } from './states/ringing.js'

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

  const base = msg.trim().split(' ')
  const selector = base[0]
  let target = ''

  // if theres a target, reassign
  if (base[1] && base[1].startsWith('@')) {
    target = base[1]
  }

  // ACTUAL
  if (selector.match(/^START$/)) {
    await incoming(target)
  }

  // MOCK
  if (selector.match(/^ACCEPT$/)) {
    await answered(target)
  }

  if (selector.match(/^DENY$/)) {
    await messageBank(target)
  }

  if (selector.match(/^END$/)) {
    await reject(target)
  }

  if (selector.match(/^RESET$/)) {
    await reset(target)
  }
}

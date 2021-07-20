import { sendToClient } from './fetch.js'
import { WebAppParams } from './types.js'

export const sendAction = (
  user: string,
  action: WebAppParams['action'],
  target: string,
  tts: string,
) => {
  const payload: WebAppParams = {
    user,
    action: action,
    target: target,
    tts: tts,
  }

  return sendToClient(payload)
}

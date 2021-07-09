import { sendToClient } from './fetch.js'
import { WebAppParams } from './types.js'

export const sendAction = (
  action: WebAppParams['action'],
  target: string,
  tts: string,
) => {
  const payload: WebAppParams = {
    action: action,
    target: target,
    tts: tts,
  }

  return sendToClient(payload)
}

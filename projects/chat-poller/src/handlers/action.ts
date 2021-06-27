import { sendToClient } from '../helpers/fetch.js'
import { WebAppParams } from '../helpers/types.js'

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

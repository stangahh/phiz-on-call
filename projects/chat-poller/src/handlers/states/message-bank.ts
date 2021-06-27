import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const messageBank = (target: string) => {
  const payload: WebAppParams = {
    action: 'message-bank',
    target: target,
  }

  return sendToClient(payload)
}

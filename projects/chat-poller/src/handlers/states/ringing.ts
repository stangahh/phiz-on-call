import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const incoming = (target: string) => {
  const payload: WebAppParams = {
    action: 'ringing',
    target: target,
  }

  return sendToClient(payload)
}

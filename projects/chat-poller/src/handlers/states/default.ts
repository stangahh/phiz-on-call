import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const reset = (target: string) => {
  const payload: WebAppParams = {
    action: 'default',
    target: target,
  }

  return sendToClient(payload)
}

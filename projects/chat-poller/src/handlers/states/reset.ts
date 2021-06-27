import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const reset = (target: string) => {
  const payload: WebAppParams = {
    action: 'reset',
    target: target,
  }

  return sendToClient(payload)
}

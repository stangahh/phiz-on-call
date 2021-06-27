import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const reject = (target: string) => {
  const payload: WebAppParams = {
    action: 'force-rejected',
    target: target,
  }

  return sendToClient(payload)
}

import { sendToClient } from '../../helpers/fetch.js'
import { WebAppParams } from '../../helpers/types.js'

export const answered = (target: string) => {
  const payload: WebAppParams = {
    action: 'answered',
    target: target,
  }

  return sendToClient(payload)
}

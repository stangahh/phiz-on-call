import fetch, { Response } from 'node-fetch'
import { WebAppParams } from './types.js'

export const sendToClient = (payload: WebAppParams): Promise<Response> => {
  return fetch(`${process.env.WEB_APP_LINK}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

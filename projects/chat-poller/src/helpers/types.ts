type States =
  | 'default'
  | 'ringing'
  | 'answered'
  | 'message-bank'
  | 'force-rejected'

/** Sync with `web-app` WebAppParams */
export interface WebAppParams {
  action?: States
  target?: string
}
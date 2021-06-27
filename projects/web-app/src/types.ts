type States =
  | 'reset' // aka RESET
  | 'ringing' // aka START
  | 'answered' // aka ACCEPT
  | 'message-bank' // aka DENY
  | 'force-rejected' // aka REJECT

/** Sync with `web-app` WebAppParams */
export interface WebAppParams {
  action?: States
  target?: string
}

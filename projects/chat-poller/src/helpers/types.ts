type States = 'reset' | 'ringing' | 'answered' | 'message-bank' | 'hang'

/** Sync with `web-app` WebAppParams */
export interface WebAppParams {
  user?: string
  action?: States
  target?: string
  tts?: string
}

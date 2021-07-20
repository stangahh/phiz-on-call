export type States =
  | 'reset' // aka RESET
  | 'ringing' // aka START
  | 'answered' // aka ACCEPT
  | 'message-bank' // aka DENY
  | 'hang' // aka HANG

/** Sync with `web-app` WebAppParams */
export interface WebAppParams {
  user: string
  action: States
  target?: string
  tts?: string
}

export interface UIState extends WebAppParams {
  sound: string
  image: string
}

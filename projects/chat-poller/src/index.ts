import { config as DotEnvConfig } from 'dotenv'
import fetch from 'node-fetch'
import { ChatUserstate, Client, Options } from 'tmi.js'

DotEnvConfig()

const options: Options = {
  identity: {
    username: process.env.AUTH_USERNAME,
    password: `oauth:${process.env.OAUTH_TOKEN}`,
  },
  channels: ['stangahh'],
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
}

const client = new Client(options)

/** Sync with `web-app` WebAppParams */
interface WebAppParams {
  action?: 'default' | 'ringing' | 'answered' | 'message-bank' | 'force-rejected',
  target?: string,
}

/** Actions to perform when a new message is received */
const onMessageHandler = async (
  channel: string,
  userState: ChatUserstate,
  msg: string,
  isSelf: boolean,
) => {
  if (isSelf) {
    return
  }

  console.log('userState', userState)

  const message = msg.trim().split(' ')

  const emoteToMatch = /^COGGERS$/

  // t3
  if (message[0].match(emoteToMatch)) {
    // TODO: make sure theyre t3, early return if no

    const payload: WebAppParams = {};

    payload.action = 'ringing'

    // optionally
    if (message[1]?.startsWith('@')) {
      console.log('trigger targeted action to', message[1])
      // augment the action
      payload.action = 'ringing'
      payload.target = message[1]
    }

    await fetch(`${process.env.WEB_APP_LINK}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  }
}

function onConnectedHandler(addr: string, port: number) {
  console.log(`Connected to ${addr}:${port}`)
}

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect().catch((e) => console.error('\nServer crashed with:', e))

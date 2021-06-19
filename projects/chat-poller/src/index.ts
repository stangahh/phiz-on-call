import { config as DotEnvConfig } from 'dotenv'
import fetch from 'node-fetch'
import { ChatUserstate, Client, Options } from 'tmi.js'

DotEnvConfig()

const options: Options = {
  identity: {
    username: process.env.AUTH_USERNAME,
    password: `oauth:${process.env.OAUTH_TOKEN}`,
  },
  channels: ['phizzi'],
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
}

const client = new Client(options)

interface WebAppParams {
  action?: 'start-calling',
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

    payload.action = 'start-calling'

    // optionally
    if (message[1]?.startsWith('@')) {
      console.log('trigger targeted action to', message[1])
      // augment the action
      payload.action = 'start-calling'
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

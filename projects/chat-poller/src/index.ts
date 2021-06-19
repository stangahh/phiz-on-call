import { config as DotEnvConfig } from 'dotenv'
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

/** Actions to perform when a new message is received */
const onMessageHandler = (
  channel: string,
  userState: ChatUserstate,
  msg: string,
  isSelf: boolean,
) => {
  if (isSelf) {
    return
  }

  const message = msg.trim().split(' ')

  const emoteToMatch = /^phizEx$/

  // t3
  if (message[0].match(emoteToMatch)) {
    console.log('trigger t3 action')

    if (message[1].startsWith('@')) {
      console.log('trigger targeted action to', message[1])
      // smack it on screen
    }
  }

  // parsing for the message
    // match the emote
    // check sub level
    // fire event to `web-app`

  // console.log(userState)
}

function onConnectedHandler(addr: string, port: number) {
  console.log(`Connected to ${addr}:${port}`)
}

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect().catch((e) => console.error('\nServer crashed with:', e))

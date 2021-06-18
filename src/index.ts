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
  console.log(userState)
}

function onConnectedHandler(addr: string, port: number) {
  console.log(`Connected to ${addr}:${port}`)
}

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect().catch((e) => console.error('\nServer crashed with:', e))

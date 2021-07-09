import { config as DotEnvConfig } from 'dotenv'
import { Client, Options } from 'tmi.js'
import { onBitHandler } from './handlers/bit.js'
import { onConnectedHandler } from './handlers/connected.js'
import { onMessageHandler } from './handlers/message.js'

DotEnvConfig()

const options: Options = {
  identity: {
    username: process.env.AUTH_USERNAME,
    password: `oauth:${process.env.OAUTH_TOKEN}`,
  },
  channels: [process.env.CHANNEL_TO_JOIN || 'twitch'],
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
}

const client = new Client(options)

client.on('message', onMessageHandler)
client.on('cheer', onBitHandler)
client.on('connected', onConnectedHandler)

client.connect().catch((e) => console.error('\nServer crashed with:', e))

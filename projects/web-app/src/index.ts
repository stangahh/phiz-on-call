import {
  json as bodyParserJson,
  urlencoded as bodyParserUrlencoded,
} from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import path from 'path'
import { getImage } from './helpers/getImage'
import { WebAppParams } from './types'

const app = express()

let image = getImage('reset')
let target = ''
let sound = ''

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParserUrlencoded({ extended: false }))
app.use(bodyParserJson())

app.get('/', (req: Request, res: Response) => {
  res.render('main', {
    title: 'Phiz Call App',
    defaultImage: image,
    interval: 2000,
    dimension: 300,
  })
})

app.get('/subscribe', (req: Request, res: Response) => {
  res.send({
    image,
    target,
    sound,
  })
})

app.post('/action', (req: Request, res: Response) => {
  const received: WebAppParams = req.body

  image = getImage(received.action)
  target = received.target || ''

  switch (received.action) {
    case 'ringing':
      sound = '/assets/sound/ringing.mp3'
      // push to queue
      // UI -> RINGING
      // Delay
      // UI -> MSG_BANK_RECORDING if no action
      break
    case 'answered':
      sound = '/assets/sound/pick-up.mp3'
      // queue pop and process
      // UI -> ANSWERED
      // play TTS message
      // UI -> PAUSE
      break
    case 'force-rejected':
      sound = '/assets/sound/hang-up.mp3'
      // skip current queue head
      // UI -> RESET
      break
    /**
    case 'message-bank':
      // push message to separate queue
      // UI -> MSG_BANK_RECORDING
      // Delay
      // UI -> RESET
      break
    case 'message-bank-playback':
      // queue pop
      // UI -> MSG_BANK_PLAYBACK
      // play TTS message
      // UI -> PAUSE
    */
    case 'reset':
    default:
      sound = ''
      // Cancel any in progress
      // UI -> RESET
      break
  }
})

app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`)
})

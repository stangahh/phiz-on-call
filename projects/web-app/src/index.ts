import {
  json as bodyParserJson,
  urlencoded as bodyParserUrlencoded,
} from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import path from 'path'
import { getImage } from './helpers/getImage'
import { Queue } from './helpers/queue'
import { UIState, WebAppParams } from './types'

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParserUrlencoded({ extended: false }))
app.use(bodyParserJson())

const jobQueue = new Queue()

/** TODO: Implement */
const messageBankQueue = new Queue()

app.get('/', (req: Request, res: Response) => {
  res.render('main', {
    title: 'Phiz Call App',
    defaultImage: getImage('reset'),
    interval: 2000,
    dimension: 300,
  })
})

app.get('/subscribe', (req: Request, res: Response) => {
  let state: UIState | undefined
  if (jobQueue.peek()) {
    state = jobQueue.peek()
  } else {
    state = {
      action: 'reset',
      image: getImage('reset'),
      sound: '',
      target: '',
      tts: '',
    }
  }
  res.send(state)
})

app.post('/action', async (req: Request, res: Response) => {
  const received: WebAppParams = req.body

  console.log('Received action:', received)

  switch (received.action) {
    case 'ringing':
      jobQueue.push({
        action: received.action,
        image: getImage(received.action),
        target: received.target || '',
        tts: received.tts || '',
        sound: '/assets/sound/ringing.mp3',
      })
      // push to queue
      // UI -> RINGING
      // Delay
      // UI -> MSG_BANK_RECORDING if no action
      break
    case 'answered':
      jobQueue.setCurrentAction(received.action)
      jobQueue.setCurrentSound('/assets/sound/pick-up.mp3')

      // queue pop and process
      // UI -> ANSWERED
      // play TTS message
      // UI -> PAUSE
      break
    case 'hang':
      jobQueue.setCurrentAction(received.action)
      jobQueue.setCurrentSound('/assets/sound/hang-up.mp3')
      await new Promise((resolve) => setTimeout(resolve, 5000))
      jobQueue.pop()
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
      jobQueue.clear()
      // Cancel any in progress
      // UI -> RESET
      break
  }
  res.send()
})

app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`)
})

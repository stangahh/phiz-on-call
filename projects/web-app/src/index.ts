import {
  json as bodyParserJson,
  urlencoded as bodyParserUrlencoded,
} from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import path from 'path'

/** Sync with `chat-poller` WebAppParams */
interface WebAppParams {
  action?:
    | 'default'
    | 'ringing'
    | 'answered'
    | 'message-bank'
    | 'force-rejected'
  target?: string
}

const app = express()

let image =
  'https://media.tenor.com/images/938c2c961d67096c2fa46edc0c579d3b/tenor.gif'
let target = ''

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParserUrlencoded({ extended: false }))
app.use(bodyParserJson())

const getImage = (action: WebAppParams['action']) => {
  switch (action) {
    case 'ringing':
      return 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/091cab3b-808f-4d0c-a614-08d4790979a5/incoming-call.gif'
    case 'answered':
      return 'https://thumbs.gfycat.com/MeanFluffyGlassfrog-max-1mb.gif'
    case 'message-bank':
      return 'https://raw.githubusercontent.com/emrekose26/RecordButton/master/art/recordbutton.gif'
    case 'force-rejected':
      return 'https://cdn.dribbble.com/users/1113077/screenshots/2801947/phone_calling.gif'
    case 'default':
    default:
      return 'https://media.tenor.com/images/938c2c961d67096c2fa46edc0c579d3b/tenor.gif'
  }
}

app.get('/', (req: Request, res: Response) => {
  res.render('main', {
    title: 'Home',
  })
})

app.get('/subscribe', (req: Request, res: Response) => {
  res.send({
    image: image,
    target: target,
  })
})

app.post('/action', (req: Request, res: Response) => {
  const received: WebAppParams = req.body

  console.log('received action from chat', received)

  image = getImage(received.action)
  target = received.target || ''
})

app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`)
})

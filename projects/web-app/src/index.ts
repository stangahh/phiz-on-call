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

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParserUrlencoded({ extended: false }))
app.use(bodyParserJson())

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

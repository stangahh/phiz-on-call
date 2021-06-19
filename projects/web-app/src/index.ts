import { json as bodyParserJson, urlencoded as bodyParserUrlencoded } from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import path from 'path'

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParserUrlencoded({ extended: false }))
app.use(bodyParserJson())

app.get('/', (req: Request, res: Response) => {
  res.render('home', {
    title: 'Home',
  })
})

app.get('/start-calling', (req: Request, res: Response) => {
  res.render('start-calling', {
    title: 'Start Calling',
  })
})

app.post('/action', (req: Request, res: Response) => {
  //
})

app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`)
})

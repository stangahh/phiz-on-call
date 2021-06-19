import compression from 'compression'
import express, { Request, Response } from 'express'
import path from 'path'

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')
app.use(compression())

app.get('/', (req: Request, res: Response) => {
  res.render('home.pug', {
    title: 'Home',
  })
})

app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`)
})

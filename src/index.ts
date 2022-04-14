import dotenv from 'dotenv'
dotenv.config()

import Factory from './notifme/factory'
import express, { Express, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import bodyParser from 'body-parser'


const app: Express = express()
app.use(bodyParser.json())
const host = process.env.SERVER_HOST || 'localhost'
const port = parseInt(process.env.SERVER_PORT || '3030')

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome!' })
})

app.post('/email',
  body('to').isEmail(),
  body('from').optional().isEmail(),
  body('subject').exists(),
  body('html').optional(),
  body('template').optional(),
  body('data').optional(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const factory = new Factory('email')

    try {
      const data = await factory.send({
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text,
        template: req.body.template,
        data: req.body.data,
      })

      res.json({
        message: 'Success send email.',
        data
      })
    } catch (error) {
      res.statusCode = 500
      res.json({ message: error || 'Error send email' })
    }
})

app.post('/sms',
  body('to').exists(),
  body('from').optional(),
  body('text').exists(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const factory = new Factory('sms')

    try {
      const data = await factory.send({
        to: req.body.to,
        from: req.body.from,
        text: req.body.text
      })
      res.json({
        message: 'Success send sms.',
        data
      })
    } catch (error) {
      res.statusCode = 500
      res.json({ message: error || 'Error send sms' })
    }
})

app.listen(port, host, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`)
})

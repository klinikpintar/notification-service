import path from 'path'
const nunjucks = require('nunjucks')
const getRenderer = require('notifme-template')
import { sdk } from './index'

class Factory {
  chanel:'email' | 'sms'
  templates:string

  constructor (chanel:'email' | 'sms') {
    this.chanel = chanel
    this.templates = path.join(__dirname, '../templates')
  }

  async renderTemplate(data:Record<string, any>, template:string = 'default-tpl'): Promise<string> {
    const render = getRenderer(nunjucks.renderString, this.templates)
    console.log(template, data)
    return render(template, data, 'id-ID')
  }

  async send(payload:Payload) {
    let content: string| null = null

    if (payload.text) {
      content = payload.text
    } else if (payload.data) {
      try {
        content = await this.renderTemplate(payload.data, payload.template)
        console.log('rendered', content)
      } catch (error) {
        console.log('error', error)
        content = ''
      }
    } else {
      throw new Error('Content can not empey')
    }

    console.log('content', content)

    if (this.chanel === 'email') {
      return this.sendEmail(payload as EmailPayload, content)
    }

    if (this.chanel === 'sms') {
      return this.sendSms(payload as SmsPayload, content)
    }

    throw new Error(`${this.chanel} is not support chanel`)
  }

  sendEmail (payload:EmailPayload, html:string) {
    return sdk.send({
      email: {
        from: payload.from || process.env.EMAIL_FROM as string,
        to: payload.to,
        subject: payload.subject,
        html
      }
    })
  }

  sendSms (payload:SmsPayload, text:string) {
    return sdk.send({
      sms: {
        from: payload.from || process.env.SMS_FROM as string,
        to: payload.to,
        text
      }
    })
  }
}

export default Factory

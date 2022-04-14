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

  async renderTemplate(data:Record<string, any>, template:string): Promise<any> {
    const render = getRenderer(nunjucks.renderString, this.templates)
    return render(template, data, 'id-ID')
  }

  async send(payload:Payload) {
    if (this.chanel === 'email') {
      return this.sendEmail(payload as EmailPayload)
    }

    if (this.chanel === 'sms') {
      return this.sendSms(payload as SmsPayload)
    }

    throw new Error(`${this.chanel} is not support chanel`)
  }

  async sendEmail (payload:EmailPayload):Promise<any> {
    const notification = await this.renderTemplate({
      to: payload.to,
      from: payload.from || process.env.EMAIL_FROM,
      subject: payload.subject,
      data: payload.data
    }, payload.template || 'email')

    return sdk.send(notification.channels)
  }

  async sendSms (payload:SmsPayload):Promise<any> {
    const notification = await this.renderTemplate({
      to: payload.to,
      from: payload.from || process.env.SMS_FROM,
      text: payload.text
    }, payload.template || 'sms')

    return sdk.send(notification.channels)
  }
}

export default Factory

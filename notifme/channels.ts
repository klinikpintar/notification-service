const channels:any = {}

let email = null
let sms = null

if (process.env.MAILGUN_API_KEY || process.env.MANDRILL_API_KEY) {
  email = {
    providers: [] as any[]
  }

  if (process.env.MAILGUN_API_KEY) {
    email.providers.push({
      type: 'mailgun',
      apiKey: process.env.MAILGUN_API_KEY,
      domainName: process.env.MAILGUN_DOMAIN
    })
  }

  if (process.env.MANDRILL_API_KEY) {
    email.providers.push({
      type: 'mandrill',
      apiKey: process.env.MANDRILL_API_KEY
    })
  }
}

if (process.env.TWILLIO_ACCOUNT_SID || process.env.NEXMO_API_KEY) {
  sms = {
    providers: [] as any[]
  }

  if (process.env.TWILLIO_ACCOUNT_SID) {
    sms.providers.push({
      type: 'twilio',
      accountSid: process.env.TWILLIO_ACCOUNT_SID,
      authToken: process.env.TWILLIO_AUTH_TOKEN
    })
  }

  if (process.env.NEXMO_API_KEY) {
    sms.providers.push({
      type: 'nexmo',
      apiKey: process.env.NEXMO_API_KEY,
      apiSecret: process.env.NEXMO_API_SECRET
    })
  }
}

if (email) {
  channels.email = email
}
if (sms) {
  channels.sms = sms
}

export default channels

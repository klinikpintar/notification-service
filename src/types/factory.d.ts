interface SmsPayload<T = Record<string, any>> {
  to: string,
  from?: string
  text?: string
  template?: string
  data?: T
}

interface EmailPayload<T = Record<string, any>>{
  to: string,
  from?: string
  text?: string
  subject: string
  template?: string
  data?: T
}

type Payload = EmailPayload | SmsPayload

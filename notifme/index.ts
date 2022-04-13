import NotifmeSdk from 'notifme-sdk'
import channels from './channels'

const sdk = new NotifmeSdk({
  useNotificationCatcher: process.env.SERVER_ENV === 'local',
  channels
})

export { sdk }
export default sdk

import NotifmeSdk from 'notifme-sdk'
import channels from './channels'

const sdk = new NotifmeSdk({ channels })

export { sdk }
export default sdk

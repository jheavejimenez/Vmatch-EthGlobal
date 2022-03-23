import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import MessagePage from './MessagePage'

export default function Messages() {
  return (
    <div className="relative flex w-full flex-row justify-between">
      <div className="fixed z-40 flex w-2/12">
        <Dashboard />
      </div>
      <div className="absolute top-16 z-30 flex w-full flex-col items-center justify-center">
        <MessagePage />
      </div>
      <div className="fixed right-0 z-40 flex w-2/12">
        <Notifications />
      </div>
    </div>
  )
}

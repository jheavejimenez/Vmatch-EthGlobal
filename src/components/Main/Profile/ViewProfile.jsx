import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import ViewPage from './ViewPage'

export default function ViewProfile() {
  return (
    <div className="relative flex w-full flex-row justify-between">
      <div className="fixed z-40 flex w-2/12">
        <Dashboard />
      </div>
      <div className="flex w-full flex-col justify-center">
        <ViewPage />
      </div>
      <div className="fixed right-0 z-40 flex w-2/12">
        <Notifications />
      </div>
    </div>
  )
}

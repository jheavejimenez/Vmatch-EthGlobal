import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import Main from './Main'

export default function Explore() {
  return (
    <div className="relative flex flex-row justify-between">
      <div className="fixed z-40 flex w-2/12">
        <Dashboard />
      </div>
      <div className="flex flex-col items-center">
        <Main />
      </div>
      <div className="fixed right-0 z-40 flex w-2/12">
        <Notifications />
      </div>
    </div>
  )
}

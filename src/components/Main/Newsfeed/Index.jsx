import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import Main from './Main'

export default function MainApp() {
  return (
    <div className="flex h-full flex-row items-center">
      <div className="flex-[.2]">
        <Dashboard />
      </div>
      <div className=" flex flex-[.6] flex-col items-center">
        <Main />
      </div>
      <div className="flex-[.2]">
        <Notifications />
      </div>
    </div>
  )
}

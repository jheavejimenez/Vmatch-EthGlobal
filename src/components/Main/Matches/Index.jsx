import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import MatchTags from '../../Test/MatchTags'

export default function Matches() {
  return (
    <div className="relative flex flex-row justify-between">
      <div className="fixed z-40 flex w-2/12">
        <Dashboard />
      </div>
      <div className="flex w-full flex-col justify-center">
        <MatchTags />
      </div>
      <div className="fixed right-0 z-40 flex w-2/12">
        <Notifications />
      </div>
    </div>
  )
}

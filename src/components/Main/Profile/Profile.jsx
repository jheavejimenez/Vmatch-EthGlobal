import Head from 'next/head'
import Dashboard from '../Fixed/Dashboard'
import Liveticker from '../Newsfeed/Liveticker'
import Test from '../../Test/Test'

import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function MainApp() {
  return (
    <div className="flex h-full w-full flex-row items-center overflow-hidden">
      <div className="flex-[.2]">
        <Dashboard />
      </div>
      <div className="flex-[.6]">
        <Test />
      </div>
      <div className="flex-[.2]">
        <Liveticker />
      </div>
    </div>
  )
}

import Head from 'next/head'
import Dashboard from './Dashboard'

import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function MainApp() {
  return (
    <div className="flex h-full flex-row items-center">
      <div className="flex-[.2]">
        <Dashboard />
      </div>
      <div className="flex-0.5">
        <div>hello</div>
      </div>
    </div>
  )
}

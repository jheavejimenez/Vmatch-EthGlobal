import {
  GlobeAltIcon,
  InboxIcon,
  UserIcon,
  UsersIcon,
  VideoCameraIcon,
  CurrencyDollarIcon
} from '@heroicons/react/outline'
import { useChain, useMoralis } from 'react-moralis'
import Image from 'next/image'
import { useRouter } from 'next/router'

import UserImage from "./user.png"
const navigation = [
  { name: 'Explore', icon: GlobeAltIcon, href: '/', current: false },
  {
    name: 'Matching',
    icon: UsersIcon,
    href: '/matching',
    count: '!',
    current: false,
  },
  {
    name: 'Videochat',
    icon: VideoCameraIcon,
    href: '/videochat',
    current: true,
  },
  { name: 'Profile', icon: UserIcon, href: '/profile', current: false },
  { name: 'Messages', icon: InboxIcon, href: '/messages', current: false },
  { name: 'Revenue', icon: CurrencyDollarIcon, href: '/revenue', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const {user
} = useMoralis()
const router = useRouter()
  return (
    <div className="flex h-screen min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
       
        {/* <div className="mt-24 flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          />
        </div> */}
        <nav
          className="mt-24 flex-1 space-y-1 bg-gray-800 px-2"
          aria-label="Sidebar"
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.href==router.pathname.replace("/","")
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              )}
            >
              <item.icon
                className={classNames(
                  item.href== router.pathname.replace("/","")
                  ? 'text-gray-300'
                    : 'text-gray-400 group-hover:text-gray-300',
                  'mr-3 h-6 w-6 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name} </span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? 'bg-gray-800'
                      : 'bg-gray-900 group-hover:bg-gray-800',
                    'ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-medium'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 bg-gray-700 p-4">
        <a href="/profile" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <Image
                className="inline-block h-9 w-9 rounded-full"
                src={(user?.get("profileImg") ? user?.get("profileImg"): UserImage)}
                alt=""
                width={35}
                height={35}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.get("firstName")} {user?.get("lastName")}</p>
              <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { useChain, useMoralis } from 'react-moralis'
import Image from 'next/image'

const navigation = [
  //   { name: 'Home', href: '#' },
  { name: 'Explore', href: '#' },
  { name: 'Profile', href: '#' },
  { name: 'Verify', href: '#' },
]

export default function HeaderApp() {
  const { switchNetwork } = useChain()
  const {
    chainId,
    isAuthenticated,
    authenticate,
    logout,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis()

  const [wrongNetwork, setWrongNetwork] = useState('')

  useEffect(() => {
    if (isWeb3Enabled) enableWeb3()
    if (isAuthenticated && chainId != null) {
      if (chainId == '0x13881') {
        setWrongNetwork(false)
      } else if (chainId != '0x13881') {
        setWrongNetwork(true)
      }
    }
  }, [isAuthenticated, chainId])

  function setRightNetwork() {
    switchNetwork('0x13881')
  }

  function handleClick() {
    if (!isAuthenticated) {
      authenticate()
    } else if (isAuthenticated) {
      logout()
    }
  }

  return (
    <div className="fixed top-0 w-full pb-4">
      <Popover as="header" className="relative">
        <div className="bg-gray-900 py-6 shadow-xl">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex flex-1 items-center">
              <div className="flex w-full items-center justify-between md:w-auto">
                {/* <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
                      alt=""
                    />
                  </a> */}
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden space-x-8 md:ml-10 md:flex">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="mr-8 hidden md:flex md:items-center md:space-x-6">
              {isAuthenticated && wrongNetwork ? (
                <button
                  className="text-base font-medium text-red-500 hover:text-gray-300"
                  onClick={setRightNetwork}
                >
                  Switch Network!
                </button>
              ) : isAuthenticated ? (
                <button
                  className="text-base font-medium text-white hover:text-gray-300"
                  onClick={handleClick}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="text-base font-medium text-white hover:text-gray-300"
                  onClick={handleClick}
                >
                  Login
                </button>
              )}
            </div>
            <Image
              src={'/fp.jpeg'}
              height={35}
              width={35}
              className="z-50 rounded-full"
            />
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 px-5" onClick={handleClick}>
                  {!isAuthenticated ? (
                    <button className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700">
                      Login with Metamask
                    </button>
                  ) : (
                    <button className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700">
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

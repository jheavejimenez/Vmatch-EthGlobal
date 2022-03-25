import { ChevronRightIcon } from '@heroicons/react/solid'
import { useMoralis } from 'react-moralis'

export default function Hero() {
  const { authenticate } = useMoralis()

  function handleClick() {
    authenticate()
  }
  return (
    <main className="w-full">
      <div className="mt-4 bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                {/* <a
                      href="#"
                      className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                        We're hiring
                      </span>
                      <span className="ml-4 text-sm">Visit our careers page</span>
                      <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                    </a> */}
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">VMATCH</span>
                  <span className="block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                    A new experience for Social Media & Online Dating.
                  </span>
                </h1>
                <div className="flex flex-col">
                  <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    Human verification process via livepeer.
                  </p>
                  <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    Verification Tag NFT via Lens Protocol.
                  </p>
                  <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    Social Media Content Monetization via Polygon.
                  </p>
                </div>
                <div className="mt-10 sm:mt-12">
                  <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                      {/* <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            />
                          </div> */}
                      <div className="mt-3 sm:mt-0">
                        <button
                          className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-400 py-3 px-4 font-medium text-black shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                          onClick={handleClick}
                        >
                          Launch App
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div className="mx-auto max-w-md px-8 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="vmatch-rough-2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

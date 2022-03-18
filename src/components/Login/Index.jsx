import Head from 'next/head'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import Feature from './Feature'
import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function Login() {
  return (
    <div className="flex flex-col py-2">
      <Head>
        <title>VMATCH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-hidden">
        <Header />
      </div>
      <Hero />
      <div>
        <div className="relative bg-gray-900">
          <div className="relative h-48 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
              alt=""
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
            />
          </div>
          <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
            <div className="md:ml-auto md:w-1/2 md:pl-10">
              <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                OUR
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                TEAM
              </p>
              <p className="mt-3 text-lg text-gray-300">
                Felix Prabitz & Dominic Hackett.
              </p>
              <div className="mt-8">
                <div
                  className="inline-flex rounded-md shadow"
                  onClick={() =>
                    window.open('https://github.com/felixpx/Vmatch-EthGlobal')
                  }
                >
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Sourcecode on Github
                    <ExternalLinkIcon
                      className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feature />
      <Footer />
    </div>
  )
}

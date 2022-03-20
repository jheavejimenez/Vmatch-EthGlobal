import {
  HeartIcon,
  PhoneIncomingIcon,
  PhoneMissedCallIcon,
  SwitchHorizontalIcon,
  SwitchVerticalIcon,
  VideoCameraIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Leonard Krasner',
    location: 'New York',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    twitterUrl: '#',
    linkedinUrl: '#',
  },
]

export default function Example() {
  useEffect(() => {}, [])

  function matchDenied() {
    //not matched, show next
  }

  function matchAccepted() {
    // MATCHED, show next
  }

  function videoChat() {
    setMatch(false)
    //start videoChat
  }
  return (
    <div className="bg-white">
      <div className="mx-auto h-full max-w-7xl py-10 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full space-y-5 sm:space-y-2 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <div className="mt-16 flex w-full flex-row items-center justify-evenly ">
              <p>VIDEO CHATTING</p>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-evenly">
            <div className="flex w-3/12 items-center ">
              <div className="rounded-lg bg-gray-800 px-2 pt-4 pb-24">
                <div className="h-96 w-72 space-y-6 xl:space-y-10">
                  <video className="w-500 h-full bg-white">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
                      src={
                        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
                      }
                      alt=""
                    />
                  </video>

                  <div className="flex h-max flex-row items-start justify-between px-4">
                    <button className="" onClick={matchDenied}>
                      <PhoneMissedCallIcon className="h-10 rounded-full bg-white p-2 text-red-500" />
                    </button>
                    <p className="text-xs text-white">Name</p>

                    <button onClick={matchAccepted}>
                      <PhoneIncomingIcon className="h-10 rounded-full bg-white p-2 text-green-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-3/12 items-center ">
              <div className="rounded-lg bg-gray-800 px-2 pt-4 pb-24">
                <div className="h-96 w-72 space-y-6 xl:space-y-10">
                  {/* <img
                      className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
                      src={person.imageUrl}
                      alt=""
                    /> */}
                  <video className="w-500 h-full bg-white">Hello</video>
                  <div className="flex h-max flex-row items-start justify-between px-4">
                    <button className="" onClick={matchDenied}>
                      <PhoneMissedCallIcon className="h-10 rounded-full bg-white p-2 text-red-500" />
                    </button>
                    <p className="text-xs text-white">Name</p>
                    <button onClick={matchAccepted}>
                      <PhoneIncomingIcon className="h-10 rounded-full bg-white p-2 text-green-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

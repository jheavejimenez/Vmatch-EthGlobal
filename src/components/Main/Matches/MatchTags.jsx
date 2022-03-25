import { HeartIcon, VideoCameraIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, Fragment } from 'react'
import { useMoralis } from 'react-moralis'
import axios from 'axios'
import { Transition } from '@headlessui/react'
import { useTimeoutFn } from 'react-use'
import { isFollowing } from '../../../lenspro/lenspro'
import { follow } from '../../../lenspro/follow'
import { sendNotification } from '../Fixed/sendnotifications'
import {
  setWindow,
  getAddressFromSigner,
} from '../../../lenspro/ethers-service'

export default function Example() {
  const router = useRouter()
  const [match, setMatch] = useState(true)
  const { Moralis, user } = useMoralis()
  const matches = useRef([])
  const [currentMatch, setCurrentMatch] = useState([])
  let [isShowing, setIsShowing] = useState(true)
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500)

  useEffect(() => {
    async function getMatches() {
      if (user) {
        Moralis.Cloud.run('getMatches', { id: user.id }).then((results) => {
          matches.current = results
          console.log(results)
          if (results.length > 0) setCurrentMatch([results[0]])
        })
      }
    }

    getMatches()
  }, [user])

  function matchDenied() {
    //not matched, show next
    if (matches.current.length > 0) {
      matches.current.splice(0, 1)
      if (matches.current.length > 0) setCurrentMatch([matches.current[0]])
      else setCurrentMatch([])
    }
    setIsShowing(false)
    resetIsShowing()
  }
  async function matchAccepted() {
    // MATCHED, show next
    setWindow(window)
    const address = await getAddressFromSigner()
    const following = await isFollowing(
      address,
      currentMatch[0].get('profileId')
    )
    if (currentMatch[0].get('profileId') != undefined)
      if (!following) {
        alert('is not following')
        follow(currentMatch[0].get('profileId'), window)
        sendNotification(
          currentMatch[0].id,
          'follow',
          '',
          'Followed you.',
          user,
          Moralis
        )
      }

    if (matches.current.length > 0) {
      matches.current.splice(0, 1)
      if (matches.current.length > 0) setCurrentMatch([matches.current[0]])
      else setCurrentMatch([])
    }

    setIsShowing(false)
    resetIsShowing()
  }

  function videoChat() {
    if (user.get('stream') == undefined) {
      let lpObect = {}
      const instance = axios.create({
        baseURL: 'https://livepeer.com/api/',

        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_LIVEPEER_API_KEY,
          'content-type': 'application/json',
        },
      })

      const result = instance.post('/stream', {
        name: user.get('handle'),
        record: false,

        profiles: [
          {
            name: '720p',
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: '480p',
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: '360p',
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      })

      result.then(async function (resp) {
        user.set('stream', JSON.stringify(resp.data))
        user.save().then(() => {
          const VideoChat = Moralis.Object.extend('VideoChat')
          const videochat = new VideoChat()
          videochat.set('from', user)
          videochat.set('to', currentMatch[0])
          videochat.set('live', false)
          videochat.save().then((object) => {
            sendNotification(
              currentMatch[0].id,
              'chat request',
              object.id,
              'Sent a video chat request.',
              user,
              Moralis
            )

            router.push(`/videochat/${object.id}`)
          })
        })
      })
    } else {
      const VideoChat = Moralis.Object.extend('VideoChat')
      const videochat = new VideoChat()
      videochat.set('from', user)
      videochat.set('to', currentMatch[0])
      videochat.set('live', false)

      videochat.save().then((object) => {
        sendNotification(
          currentMatch[0].id,
          'chat request',
          object.id,
          'Sent a video chat request.',
          user,
          Moralis
        )

        router.push(`/videochat/${object.id}`)
      })
    }

    //start videoChat
  }
  return (
    <div className="h-max bg-transparent">
      <div className="mx-auto h-full max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            {/* <p className="items-center text-xl text-gray-300">
              Find your next date via VMATCH.
            </p> */}
          </div>

          <ul
            role="list"
            className="flex w-3/12 items-center justify-center space-y-4"
          >
            <Transition
              as={Fragment}
              show={isShowing}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className="h-full w-full rounded-md shadow-lg">
                {currentMatch.map((person) => (
                  <li
                    key={person.id}
                    className="rounded-lg bg-gray-800 py-10 px-6 text-center xl:px-10 xl:text-left"
                  >
                    <div className="h-96 w-full space-y-6 xl:space-y-10">
                      <img
                        className="mx-auto h-40 w-40 cursor-pointer rounded-full xl:h-56 xl:w-56"
                        src={person.get('profileImg')}
                        onClick={() => {
                          router.push(`/viewprofile/${person.get('handle')}`)
                        }}
                        alt=""
                      />
                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="space-y-1 text-lg font-medium leading-6">
                          <h3 className="text-white">
                            {person.get('firstName')} {person.get('lastName')}
                          </h3>
                          <p className="text-indigo-400">
                            {person.get('location')}
                          </p>
                        </div>

                        <ul
                          role="list"
                          className="flex justify-center space-x-5"
                        >
                          <li>
                            <a
                              href={person.get('twitterUrl')}
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <button onClick={matchDenied}>
                          <XIcon className="h-10 rounded-full bg-white p-2 text-red-500" />
                        </button>
                        <button onClick={matchAccepted}>
                          <HeartIcon className="h-10 rounded-full bg-white p-2 text-green-500" />
                        </button>
                        <button onClick={videoChat}>
                          <VideoCameraIcon className="h-10 rounded-full bg-white p-2 text-blue-500" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </Transition>
          </ul>
        </div>
      </div>
    </div>
  )
}

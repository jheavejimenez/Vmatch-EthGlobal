import { useEffect, useRef, useState } from 'react'
import {
  VideoCameraIcon,
  MailIcon,
  HeartIcon,
  PencilIcon,
} from '@heroicons/react/solid'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import ProfileForm from './ProfileForm'
import VideoJS from './VideoJS'
import ContentProfile from './ContentProfile'
import Followers from './Followers'
import Following from './Following'
import axios from 'axios'
import { setWindow } from '../../../lenspro/ethers-service'
import { getPublications } from '../../../lenspro/getposts'

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Content', href: '#', current: false },
  { name: 'Live', href: '#', current: false },
  { name: 'Following', href: '#', current: false },
  // { name: 'Followers', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const { user, Moralis } = useMoralis()

  const router = useRouter()
  // BUTTONS
  const [matched, setMatched] = useState()
  const [editModal, setEditModal] = useState()
  // TABS
  const [selectedTab, setSelectedTab] = useState('Profile')

  //CONTENT
  const [content, setContent] = useState([])

  useEffect(() => {
    async function getPost() {
      const result = await getPublications(user.get('profileId'))
      console.log(result.publications.items)
      let r = []
      let count = result.publications.items.length
      result.publications.items.forEach((element) => {
        if (element.metadata.media.length > 0) {
          r.push({
            profileId: element.profile.id,
            handle: element.profile.handle,
            name: element.profile.name,
            title: element.metadata.name,
            description: element.metadata.description,
            file: element.metadata.media[0].original.url,
            fileType: element.metadata.media[0].original.mimeType,
            createdAt: new Date(element.createdAt),
            id: element.id.replace(element.profile.id + '-', ''),
          })
        }
        count--
        setContent(r)

        console.log(r)
      })
    }
    if (user) getPost()
  }, [user])

  /*  useEffect(() => {
    if (user) {
      const Content = Moralis.Object.extend('Content')
      const query = new Moralis.Query(Content)
      query.equalTo('address', user.get('ethAddress'))
      query.find().then((results) => {
        let result = []
        results.forEach((content) => {
          result.push(content)
        })
        setContent(result)
      })
    }
  }, [user])
*/
  // LIVE TAB
  const [livepeerStreamObject, setLivepeerStreamObject] = useState()
  const [videoJsOptions, setVideoJsOptions] = useState({
    controls: true,
    responsive: true,
    fluid: true,
    poster: user.get('coverImg'),
  })
  const playerRef = useRef(null)
  const playbackRefURL = useRef()

  const [profile, setProfile] = useState({
    name: '',
    imageUrl: '',
    coverImageUrl: '',
    about: '',
    fields: {
      Name: '',
      Email: '',
      Pronouns: '',
      Interest: '',
      Location: '',
    },
  })

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.get('username'),
        imageUrl: user.get('profileImg'),
        coverImageUrl: user.get('coverImg'),
        about: user.get('userbio'),
        fields: {
          Name: user.get('firstName') + ' ' + user.get('lastName'),
          Email: user.get('email'),
          Pronouns: user.get('Pronouns')?.get('Pronouns'),
          Interest: user.get('InterestedIn')?.get('InterestedIn'),
          Location: user.get('location'),
        },
      })
    }
  }, [])

  function handleMatch() {
    if (matched) {
      setMatched(false)
    } else {
      setMatched(true)
    }
  }

  function handleVideoCall() {
    if (user) {
      alert('cant call yourself')
    } else router.push('/videochat')
  }

  function handleMessage() {
    // open conversation / send message
  }

  const handleEdit = () => {
    setWindow(window)
    if (!editModal) {
      setEditModal(true)
      setWindow(window)
    } else if (editModal) {
      setEditModal(false)
      setWindow(window)
    }
  }

  useEffect(() => {
    if (user) {
      const handle = user.get('handle')
      if (handle == undefined) {
        setEditModal(true)
        setWindow(window)
      }
    }
  }, [])

  const handlePlayerReady = (player) => {
    playerRef.current = player
    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting')
    })

    player.on('dispose', () => {
      console.log('player will dispose')
    })
  }

  const likeLive = () => {
    // execute like
  }

  useEffect(() => {
    if (user) {
      if (user.get('stream') != undefined) {
        let livePeerObject = JSON.parse(user.get('stream'))
        let url = `https://cdn.livepeer.com/hls/${livePeerObject.playbackId}/index.m3u8`
        playbackRefURL.current = url
        startPlayBack()
      } else {
        let lpObect = {}
        const instance = axios.create({
          baseURL: 'https://livepeer.com/api/',

          headers: {
            Authorization: 'Bearer ' + process.env.REACT_APP_LIVEPEER_API_KEY,
            'content-type': 'application/json',
          },
        })

        const result = instance.post('/stream', {
          name: user.get('username'),
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
          user.save()
          let livePeerObject = JSON.parse(user.get('stream'))
          let url = `https://cdn.livepeer.com/hls/${livePeerObject.playbackId}/index.m3u8`
          playbackRefURL.current = url
          startPlayBack()
        })
      }
    }
  }, [user])

  //Start Play back of stream when it has started
  function startPlayBack() {
    var delayInMilliseconds = 12000 //12 seconds

    setTimeout(function () {
      //delay to ensure the stream is actually ready.
      if (playerRef.current != null) {
        playerRef.current.src({
          type: 'application/x-mpegURL',
          src: playbackRefURL.current,
        })
        playerRef.current.play()
      }
    }, delayInMilliseconds)
  }

  return (
    <>
      <div className="relative flex h-max w-full flex-col items-center bg-white">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {editModal && <ProfileForm handleEdit={handleEdit} />}
              {!editModal && (
                <article className="mt-18">
                  {/* Profile header */}
                  <div>
                    <div>
                      <img
                        className="h-32 w-full object-cover lg:h-48"
                        src={user.get('coverImg')}
                        alt=""
                      />
                    </div>
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                          <img
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            src={user.get('profileImg')}
                            alt=""
                          />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                            <h1 className="truncate text-2xl font-bold text-gray-900">
                              {user.get('username')}
                            </h1>
                          </div>
                          <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                            >
                              <MailIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Message</span>
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                              onClick={handleVideoCall}
                            >
                              <VideoCameraIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Video Call</span>
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                              onClick={handleMatch}
                            >
                              <HeartIcon
                                className={`-ml-1 mr-2 h-5 w-5 text-gray-400 ${
                                  matched && 'text-red-500'
                                }`}
                                aria-hidden="true"
                              />
                              <span>Match</span>
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none active:text-blue-500"
                              onClick={handleEdit}
                            >
                              <PencilIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400 "
                                aria-hidden="true"
                              />
                              <span>Edit</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mt-6 sm:mt-2 2xl:mt-5">
                    <div className="border-b border-gray-200">
                      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <nav
                          className="-mb-px flex space-x-8"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              onClick={() => setSelectedTab(tab.name)}
                              className={classNames(
                                selectedTab == tab.name
                                  ? 'cursor-pointer border-yellow-500 text-pink-500'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* Description list */}
                  <div
                    hidden={selectedTab != 'Profile'}
                    className="mx-auto mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {Object.keys(profile.fields).map((field) => (
                          <div key={field} className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              {field}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {profile.fields[field]}
                            </dd>
                          </div>
                        ))}
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            About
                          </dt>
                          <dd
                            className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                            dangerouslySetInnerHTML={{ __html: profile.about }}
                          />
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div
                    hidden={selectedTab != 'Content'}
                    className="mx-auto  mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <div className="mt-8">
                      <ul
                        role="list"
                        className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
                      >
                        {content.map((data, index) => (
                          <li
                            key={index}
                            className="relative rounded-lg shadow-lg"
                          >
                            <ContentProfile data={data} key={index} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    hidden={selectedTab != 'Live'}
                    className="mx-auto mt-8 max-w-5xl  px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <VideoJS
                      options={videoJsOptions}
                      onReady={handlePlayerReady}
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                      onClick={likeLive}
                    >
                      <HeartIcon
                        className={`-ml-1 mr-2 h-5 w-5 text-gray-400 ${
                          matched && 'text-red-500'
                        }`}
                        aria-hidden="true"
                      />
                      <span>Like</span>
                    </button>
                  </div>
                  {/* <div
                    hidden={selectedTab != 'Followers'}
                    className="mx-auto mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <Followers />
                  </div> */}
                  <div
                    hidden={selectedTab != 'Following'}
                    className="mx-auto mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <Following />
                  </div>
                </article>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

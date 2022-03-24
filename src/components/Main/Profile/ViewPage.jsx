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

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Content', href: '#', current: false },
  { name: 'Live', href: '#', current: false },
  { name: 'Following', href: '#', current: false },
  { name: 'Followers', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ViewPage() {
  const { user, Moralis } = useMoralis()

  const router = useRouter()
  const { id } = router.query

  const [userProfile, setUserProfile] = useState()

  // if (id) {
  //   const User = Moralis.Object.extend('_User')
  //   const query = new Moralis.Query(User)
  //   query.equalTo('handle', id)
  //   let result = ''
  //   query.first().then((result) => {
  //     console.log(result)
  //     console.log(id)
  //     setUserProfile(result)
  //   })
  // }

  useEffect(() => {
    if (id) {
      Moralis.Cloud.run('getProfile', { id: id }).then((results) => {
        // matches.current = results
        console.log(results)
        setUserProfile(results)
        // if (results.length > 0) setCurrentMatch([results[0]])
      })
    }
  }, [])

  // BUTTONS
  const [matched, setMatched] = useState()
  const [editModal, setEditModal] = useState()
  // TABS
  const [selectedTab, setSelectedTab] = useState('Profile')

  //CONTENT
  const [content, setContent] = useState([])

  useEffect(() => {
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
    if (userProfile) {
      setProfile({
        name: userProfile.get('username'),
        imageUrl: userProfile.get('profileImg'),
        coverImageUrl: userProfile.get('coverImg'),
        about: userProfile.get('userbio'),
        fields: {
          Name:
            userProfile.get('firstName') + ' ' + userProfile.get('lastName'),
          Email: userProfile.get('email'),
          Pronouns: userProfile.get('Pronouns')?.get('Pronouns'),
          Interest: userProfile.get('InterestedIn')?.get('InterestedIn'),
          Location: userProfile.get('location'),
        },
      })
    }
  }, [userProfile])

  function handleMatch() {
    if (matched) {
      setMatched(false)
    } else {
      setMatched(true)
    }
  }

  function handleVideoCall() {
    // alert('cant call yourself')
    //execute call to other person
  }

  function handleMessage() {
    // open conversation / send message
  }

  const handleEdit = () => {
    if (!editModal) {
      setEditModal(true)
    } else if (editModal) {
      setEditModal(false)
    }
  }

  useEffect(() => {
    if (user) {
      const handle = user.get('handle')
      if (handle == undefined) {
        setEditModal(true)
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
    let livePeerObject = JSON.parse(user.get('stream'))
    let url = `https://cdn.livepeer.com/hls/${livePeerObject.playbackId}/index.m3u8`
    playbackRefURL.current = url
    startPlayBack()
  }, [])

  //Start Play back of stream when it has started
  function startPlayBack() {
    var delayInMilliseconds = 12000 //12 seconds

    setTimeout(function () {
      //delay to ensure the stream is actually ready.
      playerRef.current.src({
        type: 'application/x-mpegURL',
        src: playbackRefURL.current,
      })
      playerRef.current.play()
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
                        src={profile.coverImageUrl}
                        alt=""
                      />
                    </div>
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                          <img
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            src={profile.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                            <h1 className="truncate text-2xl font-bold text-gray-900">
                              {profile.name}
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
                    className="mx-auto mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <div className="mt-8">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
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
                  <div
                    hidden={selectedTab != 'Followers'}
                    className="mx-auto mt-8 max-w-5xl  px-4 pb-4 sm:px-6 lg:px-8"
                  >
                    <Followers />
                  </div>
                  <div
                    hidden={selectedTab != 'Following'}
                    className="mx-auto mt-8 max-w-5xl  px-4 pb-4 sm:px-6 lg:px-8"
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

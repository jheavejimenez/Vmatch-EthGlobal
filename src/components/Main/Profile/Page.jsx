import { useEffect, useState } from 'react'
import {
  VideoCameraIcon,
  MailIcon,
  HeartIcon,
  PencilIcon,
} from '@heroicons/react/solid'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import ProfileForm from './ProfileForm'
import Image from 'next/image'

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Content', href: '#', current: false },
]
// const profile = {
//   name: 'Ricardo Cooper',
//   imageUrl:
//     'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
//   coverImageUrl:
//     'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
//   about: `
//     <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
//     <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
//   `,
//   fields: {
//     Name: 'He Him',
//     Email: 'gmail.com',
//     Pronouns: 'June 8, 1990',
//     Interest: 'InterestedIn',
//     Job: 'Product Development',
//     Location: 'location',
//     // Phone: '(555) 123-4567',
//     // Salary: '$145,000',
//   },
// }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const { user } = useMoralis()

  const router = useRouter()

  const [matched, setMatched] = useState()
  const [editModal, setEditModal] = useState()

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
    if (user && user.get('handle') != undefined) {
      setProfile({
        name: user.get('username'),
        imageUrl: user.get('profileImg'),
        coverImageUrl: user.get('coverImg'),
        about: user.get('userbio'),
        fields: {
          Name: user.get('firstName') + ' ' + user.get('lastName'),
          Email: user.get('email'),
          Pronouns: user.get('Pronouns').get('Pronouns'),
          Interest: user.get('InterestedIn').get('InterestedIn'),
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
    if (!editModal) {
      setEditModal(true)
    } else if (editModal) {
      setEditModal(false)
    }
  }

  const saveInfo = () => {
    // handle saving vi IPFS on Moralis.
  }

  useEffect(() => {
    if (user) {
      const handle = user.get('handle')
      if (handle == undefined) {
        setEditModal(true)
      }
    }
  }, [])

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
                      <Image
                        className="h-32 w-full object-cover lg:h-48"
                        src={'/ph.png'}
                        height={32}
                        width={32}
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
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? 'border-pink-500 text-gray-900'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
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
                </article>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

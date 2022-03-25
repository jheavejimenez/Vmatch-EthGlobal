import { XIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { followingRequest } from '../../../lenspro/following'
import {
  getAddressFromSigner,
  setWindow,
} from '../../../lenspro/ethers-service'

export default function Following() {
  const [followingArray, setFollowingArray] = useState([])

  useEffect(() => {
    async function seeFollowing() {
      setWindow(window)
      const address = await getAddressFromSigner()
      const results = await followingRequest(address)
      let r = []
      console.log(results)

      results.data.following.items.forEach((result) => {
        r.push({
          name: result.profile.name,
          id: result.profile.id,
          location: result.profile.location,
        })
      })

      console.log(r)
      setFollowingArray(r)
    }
    seeFollowing()
  }, [])

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {followingArray.map((person) => (
        <li
          key={person.name}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={person.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Location</dt>
              <dd className="text-sm text-gray-500">{person.location}</dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <XIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Unfollow</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <VideoCameraIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Call</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

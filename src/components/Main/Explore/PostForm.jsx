import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

export default function ProfileForm(props) {
  function closeModal() {
    props.handlePost(false)
  }

  const { Moralis, user } = useMoralis()
  const { saveFile } = useMoralisFile()

  //disable cancel button
  const [profileHandle, setProfileHandle] = useState()
  useEffect(() => {
    if (user) {
      setProfileHandle(user.get('handle'))
    }
  }, [user])

  async function posting(e) {
    e.preventDefault()

    //profile
    const userName = document.getElementById('userName').value
    const userBio = document.getElementById('userBio').value
    const profileFile = document.getElementById('profile-upload').files[0]
    const coverFile = document.getElementById('cover-upload').files[0]
    //personal
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('userEmail').value
    const location = document.getElementById('userLocation').value

    let ipfsProfile = ''
    let ipfsCover = ''

    if (profileFile) {
      console.log('uploading profile picture')
      await saveFile('profileFile', profileFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsProfile = hash._ipfs
        }
      )
    }
    if (coverFile) {
      console.log('uploading file')
      await saveFile('coverFile', coverFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }

    const InterestedIn = Moralis.Object.extend('InterestedIn')
    const int = new InterestedIn()
    int.set('objectId', selectIntId[selectedInt])

    console.log(selectIntId[selectedInt])
    const Pronouns = Moralis.Object.extend('Pronouns')
    const pro = new Pronouns()
    pro.set('objectId', selectPronId[selectedPron])

    //profile
    user.set('handle', userName)
    user.set('username', userName)
    user.set('userbio', userBio)
    user.set('profileImg', ipfsProfile)
    user.set('coverImg', ipfsCover)
    //personal
    user.set('firstName', firstName)
    user.set('lastName', lastName)
    user.set('email', email)
    user.set('location', location)
    user.set('InterestedIn', int)
    user.set('Pronouns', pro)
    //saving
    user.save().then((object) => {
      alert('saved')
      props.handlePost(false)
    })
  }

  return (
    <form className="justfify-center mt-24 flex w-full items-center">
      <div className="space-y-2">
        <p className="text-lg font-bold">Update Profile</p>
        <div>
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  profile/
                </span>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  autoComplete="username"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="userBio"
                  name="userBio"
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={''}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700"
              >
                Profile photo
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="profile-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="profile-upload"
                        name="profile-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userEmail"
                  id="userEmail"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userLocation"
                  id="userLocation"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-16 pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className={`rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={closeModal}
            disabled={profileHandle ? false : true}
          >
            Cancel
          </button>
          <button
            onClick={posting}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

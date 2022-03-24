import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

const type = [{ name: 'Free' }, { name: 'Pay to View' }]
export default function PostForm(props) {
  function closeModal() {
    props.handlePost(false)
  }

  const { Moralis, user } = useMoralis()
  const { saveFile } = useMoralisFile()

  //disable cancel button
  const [profileHandle, setProfileHandle] = useState()

  const [selected, setSelected] = useState()
  useEffect(() => {
    if (user) {
      setProfileHandle(user.get('handle'))
    }
  }, [user])

  async function posting(e) {
    e.preventDefault()

    //fetching content from form
    const contentFile = document.getElementById('contentFile').files[0]
    const contentDescription =
      document.getElementById('contentDescription').value
    const contentType = selected
    const contentPrice = document.getElementById('contentPrice').value
    const contentTitle = document.getElementById('contentTitle').value
    const contentUserImg = user.get('profileImg')

    let ipfsContent = ''

    if (contentFile) {
      console.log('uploading content')
      await saveFile('contentFile', contentFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsContent = hash._ipfs
        }
      )
    }

    const Content = Moralis.Object.extend('Content')
    const content = new Content()
    // int.set('objectId', selectIntId[selectedInt])

    // const Pronouns = Moralis.Object.extend('Pronouns')
    // const pro = new Pronouns()
    // pro.set('objectId', selectPronId[selectedPron])

    //profile
    content.set('contentFile', ipfsContent)
    content.set('contentDesc', contentDescription)
    content.set('contentType', selected)
    content.set('contentPrice', contentPrice)
    content.set('contentTitle', contentTitle)
    content.set('contentUserImg', contentUserImg)
    content.set('handle', user.get('handle'))
    content.set('address', user.get('ethAddress'))
    content.save().then((object) => {
      alert('saved')
      props.handlePost(false)
    })
  }

  return (
    <form className="mx-auto mt-24 flex w-full flex-col">
      <div className="space-y-2">
        <p className="text-lg font-bold">Upload Content</p>
        <div className="sm:col-span-3">
          <label
            htmlFor="contentTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Post Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="contentTitle"
              id="contentTitle"
              autoComplete="family-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo or Video
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
                      htmlFor="contentFile"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="contentFile"
                        name="contentFile"
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
            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="contentDescription"
                  name="contentDescription"
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={''}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">What's going on?</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Revenue
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <div className="mt-1">
                <div className="w-72">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#9945FF] bg-opacity-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selected ? selected : 'Choose Category'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {type.map((content, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={content.name}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {content.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contentPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Price in Matic
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="contentPrice"
                  id="contentPrice"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {/* <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Duration of Post
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
            </div> */}
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

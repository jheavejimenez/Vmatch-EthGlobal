import {
  CashIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'

export default function ContentProfile(props) {
  const { user } = useMoralis()

  return (
    <div className="mt-8 w-full  lg:col-span-2 lg:col-start-1">
      {/* Description list*/}
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="flex flex-row px-4 py-5 sm:px-6">
            <Image
              src={'/ph.png'}
              // src={props.data.get("userImg")}
              height={45}
              width={45}
              className="mr-4 rounded-full "
            />
            <div className="ml-4 flex flex-col">
              <div
                id="applicant-information-title"
                className="flex flex-row text-lg font-medium leading-6 text-gray-900"
              >
                Felix Prabitz
                {props.data.get('contentUser')}
                <CheckCircleIcon className="ml-1 h-3 text-green-600" />
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                20 mins ago
                {/* {props.data.get('createdAt')} */}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="mb-4">
              <img
                className="h-full w-full object-cover"
                // src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
                src={props.data.get('contentFile')}
                alt=""
              />
              {/* <Image
                //   src={'/ph.png'}
                src={props.data.get('contentImg')}
                height={45}
                width={45}
                className="mr-4 rounded-full "
              /> */}
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">My Post</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {props.data.get('contentDesc')}
              </dd>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-evenly pb-4">
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Like
              <HeartIcon className="ml-1 h-3" />
            </button>
            {/* <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Comment
              <ChatAlt2Icon className="ml-1 h-3" />
            </button> */}
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Tip
              <CashIcon className="ml-1 h-3" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

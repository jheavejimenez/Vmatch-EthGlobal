import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import MessageContainer from './MessageContainer'

/* This example requires Tailwind CSS v2.0+ */
export default function MessagePage() {
  const { user, Moralis } = useMoralis()
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="mt-4 flex w-full items-center justify-center border-b border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Messages
        </h3>
      </div>
      {/* //Message Container  */}
      <MessageContainer />
      <MessageContainer />
      <MessageContainer />
      <MessageContainer />
      {/* <div className="flex h-24 w-8/12 flex-row items-center justify-center bg-[#f5f5f5]">
        <div className="flex w-6/12 flex-row items-center justify-between">
          <Image
            src={user.get('profileImg')}
            height={75}
            width={75}
            className="rounded-full "
          />
          <div className="ml-8 flex flex-col">
            <div className="font-bold">Message Sender</div>
            <div>Message Content was sent by Message Sender</div>
          </div>
          <XIcon className="h-5 text-red-500" />
        </div>
      </div> */}
    </div>
  )
}

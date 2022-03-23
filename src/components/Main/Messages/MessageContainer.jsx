import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'

export default function MessageContainer() {
  const { user } = useMoralis()
  return (
    <div className="flex h-24 w-8/12 flex-row items-center justify-center border bg-[#f5f5f5]">
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
    </div>
  )
}

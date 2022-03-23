import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'

export default function MessageContainer() {
  const { user } = useMoralis()

  const router = useRouter()

  const deleteMessage = () => {
    // delete Message
  }

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
          <div className="text-sm">
            Message Content was sent by Message Sender
          </div>
        </div>
        <XIcon
          onClick={deleteMessage}
          className="h-5 cursor-pointer text-red-500"
        />
      </div>
    </div>
  )
}

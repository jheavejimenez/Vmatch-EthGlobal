import { CashIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import NumberFormat from 'react-number-format'

export default function PostContainer(props) {
  const { user } = useMoralis()

  const router = useRouter()

  const deleteMessage = () => {
    // delete Message
  }

  return (
    <div className="flex h-24 w-full flex-row items-center justify-center border">
      <div className="flex w-6/12 flex-row items-center justify-between">
        <Image
          src={'/ph.png'}
          height={75}
          width={75}
          className="rounded-full "
        />
        <div className="ml-8 flex flex-col">
          <div className="font-bold">{props.data.get('contentTitle')}</div>
          <div className="text-sm">{props.data.get('contentDesc')}</div>
        </div>
        <CashIcon onClick={deleteMessage} className="h-5 text-green-500" />
        <NumberFormat
          value={20}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'MATIC '}
        />{' '}
      </div>
    </div>
  )
}

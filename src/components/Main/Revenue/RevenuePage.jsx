import { useMoralis } from 'react-moralis'

/* This example requires Tailwind CSS v2.0+ */
export default function MessagePage() {
  const { user, Moralis } = useMoralis()
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="flex w-full items-center justify-center border-b border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue</h3>
      </div>
    </div>
  )
}

import Image from 'next/image'

/* This example requires Tailwind CSS v2.0+ */
export default function MessagePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="mt-4 flex w-full items-center justify-center border-b border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Messages
        </h3>
      </div>
      {/* //Message Container */}
      {/* <div className="flex h-24 w-8/12 items-center justify-center bg-[#f5f5f5]">
        <Image src={user.get("profileImg")} height={100 } width={100}>
      </div> */}
    </div>
  )
}

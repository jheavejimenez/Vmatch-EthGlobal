import {
  CashIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
  CheckIcon,
  HeartIcon,
  ThumbUpIcon,
  UserIcon,
  PhotographIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { USDCAddress, USDCABI } from '../../../Contracts/USDCContract'
import { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { LENS_HUB_ABI, LENS_HUB_CONTRACT } from '../../../lenspro/config'
import { ethers } from 'ethers'
import { setWindow, getSigner } from '../../../lenspro/ethers-service'
export default function ContentProfile(props) {
  const { user, Moralis } = useMoralis()
  const timeAgo = new TimeAgo('en-US')
  const [isTipping, setIsTipping] = useState(false)

  function tipCreator() {
    setIsTipping(true)
  }

  async function mintPost() {
    setWindow(window)
    const lensHub = new ethers.Contract(
      LENS_HUB_CONTRACT,
      LENS_HUB_ABI,
      getSigner()
    )
    console.log(parseInt(props.data.id))
    const tx = await lensHub.collect(
      parseInt(props.data.profileId),
      parseInt(props.data.id),
      []
    )
    console.log(JSON.stringify(tx))
    //  const tx = await lensHub.collect(props.data.profileId,props.data.postId,[]);
  }

  async function tipContract() {
    const tipAmount = document.getElementById('tipAmount').value
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const USDCContract = new ethers.Contract(
      USDCAddress,
      USDCABI,
      web3Provider.getSigner()
    )

    const tipReceiver = props.data.address
    console.log(tipReceiver)

    USDCContract.transfer(
      tipReceiver,
      tipAmount
      // ethers.utils.parseUnits(tipAmount.toString(), 6)
    ).then((result) => {})
  }

  return (
    <section aria-labelledby="applicant-information-title">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="flex flex-row px-4 py-5 sm:px-6">
          <Image
            src={user.get('profileImg')}
            height={45}
            width={45}
            className="mr-4 rounded-full "
          />
          <div className="ml-4 flex flex-col">
            <div
              id="applicant-information-title"
              className="flex flex-row text-lg font-medium leading-6 text-gray-900"
            >
              {props.data.handle}
              <CheckCircleIcon className="ml-1 h-3 text-green-600" />
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {timeAgo.format(props.data.createdAt)}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="mb-4">
            {props.data.fileType.includes('image/') && (
              <img
                className="h-full w-full object-cover"
                src={props.data.file}
                alt=""
              />
            )}
            {props.data.fileType.includes('video/') && (
              <video
                className="h-full w-full object-cover"
                src={props.data.file}
                alt=""
                controls
              />
            )}
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              {props.data.title}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {props.data.description}
            </dd>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-evenly pb-4">
          {!isTipping && (
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Like
              <HeartIcon className="ml-1 h-3" />
            </button>
          )}

          {!isTipping && (
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={mintPost}
            >
              Mint
              <PhotographIcon className="ml-1 h-3" />
            </button>
          )}
          {!isTipping && (
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={tipCreator}
            >
              Tip
              <CashIcon className="ml-1 h-3" />
            </button>
          )}

          {isTipping && (
            <div>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="number"
                  name="tipAmount"
                  id="tipAmount"
                  className="block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USDC
                  </span>
                </div>
              </div>
            </div>
          )}
          {isTipping && (
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={tipContract}
            >
              Tip
              <CashIcon className="ml-1 h-3" />
            </button>
          )}
          {isTipping && (
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsTipping(false)}
            >
              <XIcon className="ml-1 h-3" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

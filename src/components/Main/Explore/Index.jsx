import { PlusCircleIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Dashboard from '../Fixed/Dashboard'
import Notifications from '../Fixed/Notifications'
import Main from './Main'
import PostForm from './PostForm'
import VideoChat2 from './VideoChat2'

export default function Explore() {
  const [postContent, setPostContent] = useState()
  const [videoContent, setVideoContent] = useState()

  function handlePost() {
    if (!postContent) setPostContent(true)
    else if (postContent) setPostContent(false)
  }
  function handleVideo() {
    if (!videoContent) setVideoContent(true)
    else if (videoContent) setVideoContent(false)
    else if (postContent) setVideoContent(true)
  }
  return (
    <div className="relative flex flex-row justify-between">
      <div className="fixed z-40 flex w-2/12">
        <Dashboard />
      </div>
      <div className="relative flex h-max w-full flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <main className="relative flex-1 overflow-y-auto focus:outline-none xl:order-last">
            {!postContent && !videoContent ? (
              <Main />
            ) : postContent ? (
              <PostForm handlePost={handlePost} />
            ) : (
              <VideoChat2 handlePost={handleVideo} />
            )}
          </main>
          <div className="fixed top-36 left-56 z-50 flex flex-col space-y-8 text-white lg:left-96 ">
            <button
              type="button"
              className="z-50 inline-flex items-center rounded-full border border-transparent bg-indigo-400 p-1.5 px-4 text-white shadow-sm hover:cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handlePost}
            >
              {' '}
              Post
              <PlusCircleIcon className="ml-4 h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="z-50 inline-flex items-center rounded-full border border-transparent bg-indigo-400 p-1.5 px-4 text-white shadow-sm hover:cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleVideo}
            >
              {' '}
              Live
              <VideoCameraIcon className="ml-4 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="fixed right-0 z-40 flex w-2/12">
        <Notifications />
      </div>
    </div>
  )
}

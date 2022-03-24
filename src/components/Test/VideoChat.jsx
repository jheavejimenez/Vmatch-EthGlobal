import { HeartIcon, PhoneMissedCallIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import { Client } from '@livepeer/webrtmp-sdk'

import DailyIframe from '@daily-co/daily-js'
import styled from 'styled-components'
const CALL_OPTIONS = {
  iframeStyle: {
    width: '100%',
    height: '100%',
    border: '1px solid #e6eaef',
    borderRadius: '6px 6px 0 0',
  },
  showLeaveButton: true,
  showFullscreenButton: true,
  //   showLocalVideo: false,
  //   showParticipantsBar: false,
}

const DEFAULT_HEIGHT = 400

export default function Example() {
  const router = useRouter()
  const { id } = router.query
  const { user, Moralis } = useMoralis()
  const [vchat, setVideoChat] = useState()
  const videoRef = useRef(null)
  const videoCallRef = useRef(null)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [callframe, setCallframe] = useState(null)
  const stream = useRef(null)
  const clientRef = useRef(null)
  const sessionRef = useRef(null)
  const [livepeerStreamObject, setLivepeerStreamObject] = useState()
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!videoCallRef || !videoCallRef?.current || callframe) return
    CALL_OPTIONS.url = 'https://eventslive101.daily.co/Room1'

    const newCallframe = DailyIframe.createFrame(
      videoCallRef.current,
      CALL_OPTIONS
    )

    newCallframe.join().then(() => {
      setHeight((videoCallRef?.current?.clientWidth || 500) * 0.75)
      setCallframe(newCallframe)
    })
  }, [videoCallRef])

  useEffect(() => {
    async function getVideoChat() {
      if (user) {
        const VideoChat = Moralis.Object.extend('VideoChat')
        const query = new Moralis.Query(VideoChat)
        query.equalTo('objectId', id)
        query.first().then((result) => {
          console.log(result)
          setVideoChat(result)
          setLivepeerStreamObject(JSON.parse(user.get('stream')))
        })
      }
    }
    getVideoChat()
  }, [user])

  const streamButtonClicked = async () => {
    if (!isLive) {
      videoRef.current.volume = 0

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      if (!stream.current) {
        /* setOpenNotification(true);
         setNotificationHeader("ERROR LOADING MEDIA DEVICE")
         setNotificationBody("Your stream cannot be started.");
         setNotificationType(2); //Error
         setEventNotFound(true);
         */
        return
      }

      videoRef.current.srcObject = stream.current
      videoRef.current.play()
      clientRef.current = new Client({
        opt: { baseUrl: 'nyc-rtmp.livepeer.com/live' },
      })
      sessionRef.current = clientRef.current.cast(
        stream.current,
        livepeerStreamObject.streamKey
      )

      sessionRef.current.on('open', () => {
        console.log('Stream started.')
      })

      sessionRef.current.on('close', () => {
        console.log('Stream stopped.')
      })

      sessionRef.current.on('error', (err) => {
        console.log('Stream error.', err.message)
      })
      setIsLive(true)
    } else {
      if (videoRef.current) {
        videoRef.current.pause()

        stream.current.getTracks().forEach(function (track) {
          track.stop()
        })
        videoRef.current.srcObject = null
        stream.current = null
      }
      setIsLive(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto h-full max-w-7xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-full space-y-2 sm:space-y-2 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <div className="mt-2 flex w-full flex-row items-center justify-evenly ">
              <h3 className="mt-2 text-sm font-bold tracking-tight text-gray-800 sm:mt-5 sm:text-4xl lg:mt-6 xl:text-4xl">
                <p>VIDEO CHATTING</p>
              </h3>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-evenly">
            <div className="flex w-3/12 items-center ">
              <div className="rounded-lg bg-gray-800 px-2 pt-4 pb-24 shadow">
                <div className="space-y- h-96 w-full xl:space-y-6">
                  <div
                    className="h-full w-full bg-rose-200"
                    ref={videoCallRef}
                    height={height}
                  ></div>

                  <div className="flex h-max flex-row items-start justify-between px-4">
                    <button className="" onClick={streamButtonClicked}>
                      <HeartIcon className="h-10 rounded-full bg-white p-2 " />
                    </button>
                    <p className="text-sm text-white">
                      {vchat
                        ? user.get('firstName') + ' ' + user.get('lastName')
                        : 'Name'}
                    </p>
                    <p className="text-sm text-white">
                      {vchat
                        ? vchat.get('to').get('firstName') +
                          ' ' +
                          vchat.get('to').get('lastName')
                        : 'Name'}
                    </p>

                    <button>
                      <HeartIcon className="h-10 rounded-full bg-white p-2 " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  )
}
const Header = styled.div`
  font-size: 36px;
  text-align: center;
  padding: 24px;
`
const VideoContainer = styled.div`
  margin: 50px;
  max-width: 1000px;
  height: ${(props) => (props.hidden ? '100' : props.height)}px;
`
const Callframe = styled.div`
  width: 100%;
  height: 100%;
`

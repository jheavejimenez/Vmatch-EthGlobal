import { HeartIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import { isFollowing } from '../../lenspro/lenspro'
import { follow } from '../../lenspro/follow'
import { unfollow } from '../../lenspro/unfollow'
import DailyIframe from '@daily-co/daily-js'
import styled from 'styled-components'
import { setWindow } from '../../lenspro/ethers-service'
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const router = useRouter()
  const { id } = router.query
  const { user, Moralis } = useMoralis()
  const [vchat, setVideoChat] = useState()
  const videoCallRef = useRef(null)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [callframe, setCallframe] = useState(null)
  
  const [gotFromUserIsFollowing,setGotFromUserIsFollowing] = useState(false);
  const [followingFrom,setFollowingFrom] = useState();
  const [followingTo,setFollowingTo]  = useState();
  const [gotToUserIsFollowing,setGotToUserIsFollowing]  = useState(false);

useEffect(()=>{
  setWindow(window);
},[])
 //Get if the "from" user is Following the "to" user
 //There are two pointers found in the video chat Class
 //"from"  points to a user object. This is the user that initiates the chat
  useEffect(()=>{
     async function getUserFollow()
     {
      console.log(`${vchat.get("from").get("ethAddress")} ${vchat.get("to").get("profileId")}`)
        const result = await isFollowing(vchat.get("from").get("ethAddress"),vchat.get("to").get("profileId"));
        setFollowingFrom(result);
        setGotFromUserIsFollowing(true);
     }
     
     if(vchat)
     getUserFollow();
  },[vchat])



 //Get if the "to" user is Following the "from" user
 //There are two pointers found in the video chat Class
 //"to"  points to a user object. This is the user that was invited to chat
 useEffect(()=>{
  async function getUserFollow()
  {
    console.log(`${vchat.get("to").get("ethAddress")} ${vchat.get("from").get("profileId")}`)
    const result = await isFollowing(vchat.get("to").get("ethAddress"),vchat.get("from").get("profileId"));
    setFollowingTo(result);
    setGotToUserIsFollowing(true);
  }
  
  if(vchat)
  getUserFollow();
},[vchat])



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
        })
      }
    }
    getVideoChat()
  }, [user])

 const toggleFollowFromUser = async() =>
 {
    if(followingFrom==false)
    {
        const result = await follow(vchat.get("from").get("profileId"));
        setFollowingFrom(true);
    }
    else
    {

      const result = await unfollow(vchat.get("from").get("profileId"));
      setFollowingFrom(false);

    }
 }

 const toggleFollowToUser = async() =>
 {
  if(followingTo==false)
  {
     const result = await follow(vchat.get("to").get("profileId"));


     setFollowingTo(true);
  }
  else
  {

    const result = await unfollow(vchat.get("to").get("profileId"));
    setFollowingTo(false);

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
                    <button onClick={toggleFollowFromUser} disabled={!gotFromUserIsFollowing || vchat.get("to").get("ethAddress") != user.get("ethAddress") } className={ `${gotFromUserIsFollowing ==true ? (followingFrom == true ? "text-red-400": "text-gray-400") : "text-gray-400" }` } >
                      <HeartIcon className="h-10 rounded-full bg-white p-2" />
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

                    <button onClick={toggleFollowToUser} disabled={!gotFromUserIsFollowing || vchat.get("from").get("ethAddress") != user.get("ethAddress") } className={ `${gotToUserIsFollowing ==true ? (followingTo == true ? "text-red-400": "text-gray-400") : "text-gray-400" }` } >
                      <HeartIcon className="h-10 rounded-full bg-white p-2" />
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

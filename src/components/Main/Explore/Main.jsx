/* This example requires Tailwind CSS v2.0+ */
import {
  CheckIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Contentpost from './Contentpost'
import {getPublications} from '../../../lenspro/getposts'




export default function Main() {
  const { Moralis, user } = useMoralis()

  const [exploreContent, setExploreContent] = useState([])


  useEffect(()=>{
    async function getPost(){
    const result = await getPublications(user.get("profileId"));
    console.log(result.publications.items);
    let r  = [];
    result.publications.items.forEach(element => {
      if(element.metadata.media.length > 0)
      {
        r.push({profileId:element.profile.id,handle:element.profile.handle,name:element.profile.name,
          title:element.metadata.name,description:element.metadata.description
          ,file:element.metadata.media[0].original.url,fileType:element.metadata.media[0].original.mimeType, 
        createdAt:new Date (element.createdAt),id:element.id.replace(element.profile.id+"-","")});

      }
      setExploreContent(r)
     
      console.log(r)
    });
      
    }
    if(user)
     getPost();
    
    },[user])
    

/*  useEffect(() => {
    if (user) {
      const Content = Moralis.Object.extend('Content')
      const query = new Moralis.Query(Content)
      query.descending('createdAt')
      query.find().then((results) => {
        let result = []
        results.forEach((content) => {
          result.push(content)
        })
        setExploreContent(result)
        console.log(result)
      })
    }
  }, [user])
*/
  return (
    <div className="relative flex w-full flex-col items-center justify-center space-y-6 overflow-y-scroll lg:col-span-2 lg:col-start-1">
      {exploreContent.map((data, index) => (
        <Contentpost data={data} key={index} />
      ))}
      {/* <Contentpost />
      <Contentpost />
      <Contentpost />
      <Contentpost /> */}
    </div>
  )
}

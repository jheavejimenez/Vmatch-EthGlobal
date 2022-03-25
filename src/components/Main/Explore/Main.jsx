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

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]
const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
]

export default function Main() {
  const { Moralis, user } = useMoralis()

  const [exploreContent, setExploreContent] = useState([])

  useEffect(() => {
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

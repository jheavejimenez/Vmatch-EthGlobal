import {
  CashIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
  CheckIcon,
  HeartIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'

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

export default function Contentpost(props) {
  const { user } = useMoralis()

  return (
    <div className="mt-36 w-3/12 space-y-6 lg:col-span-2 lg:col-start-1">
      {/* Description list*/}
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="flex flex-row px-4 py-5 sm:px-6">
            <Image
              src={'/ph.png'}
              // src={props.data.get("userImg")}
              height={45}
              width={45}
              className="mr-4 rounded-full "
            />
            <div className="ml-4 flex flex-col">
              <div
                id="applicant-information-title"
                className="flex flex-row text-lg font-medium leading-6 text-gray-900"
              >
                {/* Felix Prabitz */}
                {props.data.get('handle')}
                <CheckCircleIcon className="ml-1 h-3 text-green-600" />
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                20 mins ago
                {/* {props.data.get('createdAt')} */}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            {/* <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"> */}
            {/* <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Application for
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Backend Developer
                </dd>
              </div> */}
            {/* <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ricardocooper@example.com
                </dd>
              </div> */}
            {/* <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div> */}
            {/* <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
              </div> */}
            {/* <Image src={'/moralis.jpeg'} height={150} width={150} /> */}
            <div className="mb-4">
              <img
                className="h-full w-full object-cover"
                // src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
                src={props.data.get('contentFile')}
                alt=""
              />
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">My Post</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {/* Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu. */}
                {props.data.get('contentDesc')}
              </dd>
            </div>
            {/* </dl> */}
          </div>
          <div className="flex w-full flex-row items-center justify-evenly pb-4">
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Like
              <HeartIcon className="ml-1 h-3" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Comment
              <ChatAlt2Icon className="ml-1 h-3" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Tip
              <CashIcon className="ml-1 h-3" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

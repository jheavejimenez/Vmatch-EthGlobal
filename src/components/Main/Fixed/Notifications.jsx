import {
  GlobeAltIcon,
  InboxIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/outline'

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Max Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'The Graph Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Livepeer Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  // More people...
]
const activityItems = [
  {
    id: 1,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 2,
    person: people[1],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 3,
    person: people[2],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div className="flex h-screen min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="mt-16 flex flex-col items-center justify-center text-white">
          <h1 className="text-lg">Notifications</h1>
          <ul role="list" className="mx-4 divide-y divide-gray-200">
            {activityItems.map((activityItem) => (
              <li key={activityItem.id} className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={activityItem.person.imageUrl}
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {activityItem.person.name}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {activityItem.time}
                      </p>
                    </div>
                    <p className="text-sm text-gray-300">
                      Deployed {activityItem.project} ({activityItem.commit} in
                      master) to {activityItem.environment}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

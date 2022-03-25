import { useMoralis } from 'react-moralis'
import { useEffect, useState, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
TimeAgo.addLocale(en)

export default function Dashboard() {
  const { Moralis, user } = useMoralis()
  const [alerts, setAlerts] = useState([])
  const subscribeToNotifications = useRef()
  const router = useRouter()
  const timeAgo = new TimeAgo('en-US')
  const [updateNotifications, setUpdateNotifications] = useState(new Date())

  //Live Query for Notifications
  useEffect(() => {
    async function getNotifications() {
      const Notification = Moralis.Object.extend('Notification')
      const query = new Moralis.Query(Notification)
      query.equalTo('to', user)
      query.descending('createdAt')
      subscribeToNotifications.current = await query.subscribe()
      subscribeToNotifications.current.on('create', (object) => {
        setUpdateNotifications(new Date())
      })
    }
    if (user) getNotifications()

    return function cleanup() {
      if (subscribeToNotifications.current)
        subscribeToNotifications.current.unsubscribe()
    }
  }, [user])

  //Query initial Notifications
  useEffect(() => {
    // if (user) {
    //   const Notification = Moralis.Object.extend('Notification')
    //   const query = new Moralis.Query(Notification)
    //   query.equalTo('to', user)
    //   query.descending('createdAt')
    //   query.find().then((results) => {

    //   })
    // }
    if (user) {
      Moralis.Cloud.run('getNotifications', { id: user.id }).then((results) => {
        console.log(results)
        setAlerts(results)
      })
    }
  }, [user, updateNotifications])

  const viewNotification = async (n) => {
    if (n.get('actionId') != '' && n.get('action') == 'chat request') {
      router.push(`/videochat/${n.get('actionid')}`)
    }
  }

  return (
    <div className="flex h-screen min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="mt-16 flex flex-col items-center justify-center text-white">
          <h1 className="text-lg">Notifications</h1>
          <ul role="list" className="mx-4 divide-y divide-gray-200">
            {alerts.map((activityItem) => (
              <li
                key={activityItem.id}
                className="cursor-pointer py-4"
                onClick={() => viewNotification(activityItem)}
              >
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={activityItem.get('from').get('profileImg')}
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {`${activityItem
                          .get('from')
                          .get('firstName')} ${activityItem
                          .get('from')
                          .get('lastName')}`}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-300">
                      {activityItem.get('message')}
                    </p>
                    <p className="text-sm text-gray-300">
                      {timeAgo.format(activityItem.get('createdAt'))}
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

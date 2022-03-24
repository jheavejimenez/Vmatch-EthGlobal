import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import PostContainer from '../Revenue/PostContainer'

/* This example requires Tailwind CSS v2.0+ */
export default function MessagePage() {
  const { user, Moralis } = useMoralis()

  const [content, setContent] = useState([])

  useEffect(() => {
    if (user) {
      const Content = Moralis.Object.extend('Content')
      const query = new Moralis.Query(Content)
      query.equalTo('address', user.get('ethAddress'))
      query.find().then((results) => {
        let result = []
        results.forEach((content) => {
          result.push(content)
        })
        setContent(result)
      })
    }
  }, [user])
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="flex w-full items-center justify-center border-b border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue</h3>
      </div>
      {content.map((data, index) => (
        <li key={index} className="relative w-full rounded-lg shadow-lg">
          <PostContainer data={data} key={index} />
        </li>
      ))}
    </div>
  )
}

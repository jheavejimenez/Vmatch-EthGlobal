import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login/Index'
import HeaderApp from '../src/components/Main/Fixed/HeaderApp'
import MainApp from '../src/components/Main/Explore/Index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { isAuthenticated, user } = useMoralis()

  const router = useRouter()

  if (!isAuthenticated) return <Login />

  useEffect(() => {
    if (user) {
      const handle = user.get('handle')
      if (handle != user.get('username')) {
        router.push('profile')
      } else router.push('/')
    }
  }, [user])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderApp />
      <MainApp />
    </div>
  )
}

export default Home

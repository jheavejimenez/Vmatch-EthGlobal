import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login/Index'
import HeaderApp from '../src/components/Main/Topend/HeaderApp'
import Profile from '../src/components/Main/App/Profile'

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed top-0 overflow-hidden">
        <HeaderApp />
      </div>
      <div className="">
        <Profile />
      </div>
    </div>
  )
}

export default Home

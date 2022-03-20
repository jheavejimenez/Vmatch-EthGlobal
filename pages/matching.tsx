import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login/Index'
import HeaderApp from '../src/components/Main/Fixed/HeaderApp'
import Matches from '../src/components/Main/Matches/Index'

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 py-2">
      <Head>
        <title>VMATCH - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderApp />
      <Matches />
    </div>
  )
}

export default Home

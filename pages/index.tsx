import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Header from '../src/components/Login/Header'
import Login from '../src/components/Login/Index'

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}

export default Home

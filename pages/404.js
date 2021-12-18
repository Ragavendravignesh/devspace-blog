import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function NotFoundPage() {
  return (
    <Layout title='Page not found'>
      <div className='flex flex-col items-center my-20'>
        <Image
          src={'/images/logo.png'}
          height={70}
          width={80}
          className='bg-gray-800 rounded-2xl'
        />

        <h1 className='text-6xl mb-3'>Whoops!</h1>

        <h3 className='text-3xl text-gray-400'>This page does not exist</h3>
      </div>
    </Layout>
  )
}

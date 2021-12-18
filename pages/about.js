import Layout from '../components/Layout'

export default function AbputPage() {
  return (
    <Layout title='About us | Devspace Blog'>
      <h1 className='text-5xl border-b-4 pb-3'>About us</h1>

      <div className='shadow-md rounded-lg bg-white px-10 py-6 mt-6'>
        <h3 className='text-3xl mb-5'>Devspace Blog</h3>
        <p className='mb-3'>This is an blog build with nextjs and markdown</p>

        <p>
          <span className='font-bold'>Version 1.0.0</span>
        </p>
      </div>
    </Layout>
  )
}

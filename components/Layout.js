import Head from 'next/head'
import Header from './Header'
import Search from './Search'

export default function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Search />
      <main className='container mx-auto my-7'>{children}</main>
    </div>
  )
}

Layout.defaultProps = {
  title: 'Devspace-blog',
  description: 'We are creating the future here',
  keywords: 'Blog, Content, Writing, Love',
}

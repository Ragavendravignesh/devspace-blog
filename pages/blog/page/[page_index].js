import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import Post from '@/components/Post'
import { sortByDate } from '@/utils/index'
import { POST_PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'
import { getPosts } from '@/lib/posts'

export default function BlogPage({ posts, numPages, currentPage }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blogs</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Pagination numPages={numPages} currentPage={currentPage} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPage = Math.ceil(files.length / POST_PER_PAGE)
  const paths = []

  for (let i = 1; i <= numPage; i++) {
    paths.push({ params: { page_index: i.toString() } })
  }

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1)
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POST_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = getPosts()
    .slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  }
}

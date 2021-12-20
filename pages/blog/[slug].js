import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'
import Link from 'next/link'
import { marked } from 'marked'

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  slug,
  content,
}) {
  return (
    <Layout title={title}>
      <Link href='/blog'>Go back</Link>

      <div className='px-6 py-5 rounded-lg shadow-md bg-white mt-3'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-3xl font-bold'>{title}</h3>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} className='w-full rounded mt-3' />
        <div className='flex justify-between items-center mt-5'>
          <div className='flex items-center'>
            <img
              src={author_image}
              className='h-10 w-10 rounded-full hidden sm:block'
            />
            <h3 className='ml-2 text-xl'>{author}</h3>
          </div>

          <h3 className='mr-4'>{date}</h3>
        </div>

        <div className='blog-text mt-5'>
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const markDownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markDownWithMeta)
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  }
}

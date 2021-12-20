import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'

export default function CategoryPage({ posts, category_name, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>
            Posts in{' '}
            {category_name.charAt(0).toUpperCase() + category_name.slice(1)}
          </h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const categories = files.map((filename) => {
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markDownWithMeta)

    return {
      params: {
        category_name: frontmatter.category.toLowerCase(),
      },
    }
  })

  return {
    paths: categories,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts()
  const fileteredPosts = posts.filter(
    (post) => post.frontMatter.category.toLowerCase() === category_name
  )

  const categories = posts.map((post) => post.frontMatter.category)
  const uniqueCategories = [...new Set(categories)]

  return {
    props: {
      posts: fileteredPosts,
      category_name,
      categories: uniqueCategories,
    },
  }
}

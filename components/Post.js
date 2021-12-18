import Link from 'next/link'
import Image from 'next/image'

export default function PostPage({ post }) {
  return (
    <div className='bg-white px-10 py-6 shadow-md rounded-lg mt-6'>
      <Image
        src={post.frontMatter.cover_image}
        height={420}
        width={600}
        alt=''
        className='rounded mb-3'
      />

      <div className='flex justify-between items-center'>
        <span className='text-gray-600 font-light'>
          {post.frontMatter.date}
        </span>
        <div>{post.frontMatter.category}</div>
      </div>

      <div className='mt-5'>
        <Link href={`/blog/${post.slug}`}>
          <a className='text-2xl text-gray-700 font-bold hover:underline'>
            {post.frontMatter.title}
          </a>
        </Link>
        <p className='mt-5 text-gray-600'>{post.frontMatter.excerpt}</p>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <Link href={`/blog/${post.slug}`}>
          <a className='text-blue-400 hover:text-green-400'>Read more</a>
        </Link>

        <div className='flex items-center'>
          <img
            src={post.frontMatter.author_image}
            alt=''
            className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
          />
          <h3 className='text-gray-700 font-bold'>{post.frontMatter.author}</h3>
        </div>
      </div>
    </div>
  )
}

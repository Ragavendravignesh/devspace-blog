import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  slug,
  content,
}) {
  return <div>Hello</div>
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
  console.log(slug)
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

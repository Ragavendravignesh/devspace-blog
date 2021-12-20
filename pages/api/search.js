// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default (req, res) => {
  let posts

  if (process.env.NODE_ENV === 'production') {
  } else {
    const files = fs.readdirSync(path.join('posts'))

    posts = files.map((filename) => {
      const slug = filename.replace('.md', '')

      const markdownwithmeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
      )

      const { data: frontMatter } = matter(markdownwithmeta)

      return {
        slug,
        frontMatter,
      }
    })
  }

  const filteredPosts = posts.filter(
    ({ frontMatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  )

  res.status(200).json(JSON.stringify({ filteredPosts }))
}

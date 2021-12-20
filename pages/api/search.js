// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default (req, res) => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const markdownwithmeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownwithmeta)

    return {
      frontmatter,
    }
  })

  const filteredPosts = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) => {
        title.toLowerCase().indexOf(req.query.q) != -1||
        excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
        category.toLowerCase().indexOf(req.query.q) != -1 
    }
  )

  res.status(200).json(JSON.stringify({ filteredPosts }))
}

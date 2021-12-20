import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const files = fs.readdirSync(path.join('posts'))

export function getPosts() {
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')

    const markDown = fs.readFileSync(path.join('posts', fileName), 'utf-8')

    const { data: frontMatter } = matter(markDown)

    return {
      slug,
      frontMatter,
    }
  })

  return posts.sort(sortByDate)
}

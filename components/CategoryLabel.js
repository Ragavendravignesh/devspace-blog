import Link from 'next/link'

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: 'bg-orange-400',
    Python: 'bg-red-400',
    PHP: 'bg-amber-400',
    CSS: 'bg-lime-400',
  }

  return (
    <div
      className={`px-2 py-2 ${colorKey[children]} text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  )
}

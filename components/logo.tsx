import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="https://github.com/maanvithag/thinkai" className="block" aria-label="ThinkAI">
      <div className="rounded p-2">
        <h3 className="h3 text-white bg-navy-100 px-2 py-1 rounded">
          thinkAi
        </h3>
        <rect width="32" height="32"/>
      </div>
      
    </Link>
  )
}

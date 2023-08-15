import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="ThinkAI">
      <div className="rounded p-2 bg-gradient-to-r from-slate-500 to-slate-600">
        <h4 className="font-mono text-white ">
          thinkAi
        </h4>
        <rect width="32" height="32"/>
      </div>
      
    </Link>
  )
}

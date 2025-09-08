import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold">
          SYNDAverse
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/app">Dashboard</Link>
          <Link href="https://github.com/christopherrichardson25-SYNDA" target="_blank">
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}


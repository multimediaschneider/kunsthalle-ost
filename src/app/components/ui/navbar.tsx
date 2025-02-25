import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-stone-300/30 border-b border-zinc-400 backdrop-blur-md z-50">
      <ul className="flex justify-between items-center p-4 text-zinc-800 text-md">
        <li>
          <Link href="/current" className="hover:underline">
            Current
          </Link>
        </li>
        <li>
          <Link href="/past" className="hover:underline">
            Past
          </Link>
        </li>
        <li>
          <Link href="/info" className="hover:underline">
            Info
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

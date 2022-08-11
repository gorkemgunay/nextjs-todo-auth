import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center bg-black h-10 text-white">
      <nav className="max-w-2xl w-full mx-auto px-4">
        <ul>
          <li className="font-semibold">
            <Link href="/">Todo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

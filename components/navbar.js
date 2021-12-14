import Head from "next/head";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav>
        <div className="logo">
          <Link href="/">
            <a>Renewed Mood</a>
          </Link>
        </div>
        <div className="items">
          <Link href="/about">
            <a className="item">About</a>
          </Link>
          <Link href="/login">
            <a className="item">Login</a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

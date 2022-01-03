import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Auth } from "aws-amplify";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const notLoggedInPages = ["About", "Login"];
  const loggedInPages = ["Journal", "Profile"];

  const checkLoggedIn = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setLoggedIn(true);
      console.log("true");
    } catch {
      setLoggedIn(false);
      console.log("false");
    }
  };

  checkLoggedIn();

  return (
    <div className="nav-container">
      <nav>
        <div className="logo">
          <Link href="/">
            <a>Renewed Mood</a>
          </Link>
        </div>
        <div className="items">
          {console.log("loggedIn: ", loggedIn)}
          {loggedIn
            ? loggedInPages.map((page, i) => (
                <Link key={i} href={`/${page.toLowerCase()}`}>
                  <a className="item">{page}</a>
                </Link>
              ))
            : notLoggedInPages.map((page, i) => (
                <Link key={i} href={`/${page.toLowerCase()}`}>
                  <a className="item">{page}</a>
                </Link>
              ))}
        </div>
      </nav>
    </div>
  );
}

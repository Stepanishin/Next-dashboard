"use client";

import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { SessionContextValue, signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const NavbarLink = ({ url, title }) => (
  <Link href={url} className={styles.link}>
    {title}
  </Link>
);

const Navbar = () => {
  const session: SessionContextValue = useSession();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Evgenii
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <NavbarLink key={link.id} url={link.url} title={link.title} />
        ))}
        {session.status === "authenticated" ? (
          <button className={styles.logout} onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <Link className={styles.logout} href={"/dashboard/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import NextImage from './NextImage';
import LocaleSwitch from './LocaleSwitch';

import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';

const Navbar = ({ navbar, pageContext }) => {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 flex items-center justify-center w-screen h-16 px-2 md:px-6 bg-white border-b z-50">
      <div className="flex align-center w-full justify-between">
        <Link href="/">
          <a className="flex justify-center cursor-pointer">
            <NextImage media={navbar.logo} height="40" width="200" />
          </a>
        </Link>
        <div className="flex gap-x-4">{session && <button onClick={() => signOut()}>Sign Out</button>}</div>
      </div>
    </nav>
  );
};

export default Navbar;

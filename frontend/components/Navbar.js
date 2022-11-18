import NextImage from './NextImage';

import Link from 'next/link';

import SubscribeForm from './SubscribeForm';

const Navbar = ({ navbar, pageContext }) => {
  return (
    <nav className="fixed top-0 flex items-center justify-center w-screen h-32 md:h-16 px-2 md:px-6 bg-white border-b z-50">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row align-center w-full md:justify-between">
        <Link href="/">
          <a className="flex justify-center cursor-pointer">
            <NextImage media={navbar.logo} height="40" width="200" />
          </a>
        </Link>
        <div className="flex items-center justify-center">
          <SubscribeForm />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

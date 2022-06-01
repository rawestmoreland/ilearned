import NextImage from './NextImage'

import Link from 'next/link'

const Navbar = ({ navbar }) => {
	return (
		<nav className='fixed top-0 flex items-center justify-center w-screen h-16 px-2 md:px-6 bg-white border-b z-50'>
			<div className='flex align-center w-full justify-between'>
				<Link href='/'>
					<a className='cursor-pointer'>
						<NextImage
							media={navbar.logo}
							height={40}
							width={200}
						/>
					</a>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar

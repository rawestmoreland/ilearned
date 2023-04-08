import Link from 'next/link'
import NextImage from './NextImage'

const Footer = ({ footer }) => {
	const { smallText, columns } = footer
	return (
        <footer className='absolute bottom-0 w-full flex flex-col h-60 justify-between bg-oxford-blue p-4'>
			<div className='container flex flex-col'>
				<div>
					{footer.logo && (
						<NextImage
							width='200'
							height='40'
							media={footer.logo}
						/>
					)}
				</div>
				<nav className='flex flex-col flex-wrap md:flex-row gap-8 mb-8 mt-4'>
					{columns.map((footerColumn) => (
						<div
							key={footerColumn.id}
							className='lg:mt-0 w-6/12 lg:w-auto'
						>
							<p className='uppercase tracking-wider text-terracotta font-rubik font-semibold'>
								{footerColumn.title}
							</p>
							<ul className='mt-2'>
								{footerColumn.links.map((link) => (
									<li
										key={link.id}
										className='text-off-white py-1 px-1 -mx-1'
									>
										<Link href={link.url} className='hover:underline cursor-pointer font-rubik'>

                                            {link.text}

                                        </Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</div>
			<div className='container font-rubik text-off-white text-sm'>
				{smallText}
			</div>
		</footer>
    );
}

export default Footer

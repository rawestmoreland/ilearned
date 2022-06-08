import Image from 'next/image'
import Link from 'next/link'

import format from 'date-fns/format'
import { localeMap } from '../utils/localize'

const AuthorRow = ({ author, published, locale }) => {
	const { picture, name, slug } = author.attributes
	return (
		<Link href={`/${locale === 'en' ? '' : locale + '/'}author/${slug}`}>
			<div className='grid grid-cols-[40px_1fr] gap-x-2 items-center font-merriweather text-sm mb-4 [margin-block-start:auto] cursor-pointer'>
				<div>
					<Image
						src={picture.data.attributes.url}
						height={40}
						width={40}
						objectFit='cover'
						className='rounded-full'
						alt={picture.data.attributes?.alternativeText || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<span className='font-bold'>{name}</span>
					<span>
						{format(new Date(published), 'PPP', {
							locale: localeMap[locale],
						})}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default AuthorRow

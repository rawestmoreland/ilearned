import Image from 'next/image'
import Link from 'next/link'

import AuthorRow from './AuthorRow'
import CategoryRow from './CategoryRow'

const PostCard = ({ post }) => {
	const {
		title,
		image,
		categories,
		description,
		authors,
		published,
		locale,
		slug,
	} = post.attributes
	return (
		<div className='flex flex-col justify-between bg-off-white border rounded-lg h-full'>
			<div className='relative top-0 left-0 w-full h-[250px] rounded-t-lg cursor-pointer'>
				<Link
					href={`/${locale !== 'en' ? locale + '/' : ''}post/${slug}`}
				>
					<a>
						<Image
							src={image.data.attributes.url}
							objectFit='cover'
							layout='fill'
							className='rounded-t-lg'
							alt={image.data.attributes?.alternativeText || ''}
						/>
					</a>
				</Link>
			</div>
			<div className='flex flex-col h-full mx-4'>
				<CategoryRow categories={categories} />
				<Link
					href={`/${locale !== 'en' ? locale + '/' : ''}post/${slug}`}
				>
					<h2 className='font-rubik font-bold text-xl mb-4 cursor-pointer'>
						{title}
					</h2>
				</Link>
				<div className='font-merriweather text-sm leading-loose mb-4'>
					<p className='line-clamp-6'>{description}</p>
				</div>
				{authors.data[0] && (
					<AuthorRow
						author={authors.data[0]}
						published={published}
						locale={locale}
					/>
				)}
			</div>
		</div>
	)
}

export default PostCard

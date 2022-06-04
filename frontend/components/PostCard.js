import Image from 'next/image'

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
	} = post.attributes
	return (
		<div className='bg-off-white border rounded-lg'>
			<div className='relative top-0 left-0 w-full h-[250px] rounded-t-lg'>
				<Image
					src={image.data.attributes.url}
					objectFit='cover'
					layout='fill'
					className='rounded-t-lg'
					alt={image.data.attributes?.alternativeText || ''}
				/>
			</div>
			<div className='m-4'>
				<CategoryRow categories={categories} />
				<h2 className='font-rubik font-bold text-xl mb-4'>{title}</h2>
				<div className='font-merriweather text-sm leading-loose mb-4'>
					<p className='line-clamp-6'>{description}</p>
				</div>
				<AuthorRow
					author={authors.data[0]}
					published={published}
					locale={locale}
				/>
			</div>
		</div>
	)
}

export default PostCard

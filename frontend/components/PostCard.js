import Image from 'next/image'

import { format } from 'date-fns'
import { en, fr } from 'date-fns/locale'

const localeMap = {
	'en': en,
	'fr-FR': fr,
}

const PostCard = ({ post }) => {
	console.log(post)
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
		<div className='bg-off-white border rounded-md'>
			<div className='relative top-0 left-0 w-full h-[250px]'>
				<Image
					src={image.data.attributes.url}
					objectFit='cover'
					layout='fill'
				/>
			</div>
			<div className='m-4'>
				<div className='flex text-terracotta text-xs font-bold font-big-shoulders tracking-widest uppercase mt-4 gap-x-2'>
					{categories.data.map((cat) => {
						const { name } = cat.attributes
						// TODO: Make these links
						return <span key={cat.id}>{name}</span>
					})}
				</div>
				<h2 className='font-rubik font-bold text-xl mb-4'>{title}</h2>
				<div className='font-merriweather text-sm leading-loose mb-4'>
					<p>{description}</p>
				</div>
				<div className='font-merriweather text-sm'>
					<span className='font-bold'>
						{authors.data[0].attributes.name}
					</span>
					<span>
						{' '}
						on{' '}
						{format(new Date(published), 'PPP', {
							locale: localeMap[locale],
						})}
					</span>
				</div>
			</div>
		</div>
	)
}

export default PostCard

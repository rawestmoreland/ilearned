import Image from 'next/image'

import { format } from 'date-fns'
import { en, fr } from 'date-fns/locale'

const localeMap = {
	'en': en,
	'fr-FR': fr,
}

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
					<p className='line-clamp-6'>{description}</p>
				</div>
				<div className='grid grid-cols-[40px_1fr] gap-x-2 items-center font-merriweather text-sm'>
					<div>
						<Image
							src={
								authors.data[0].attributes.picture.data
									.attributes.url
							}
							height={40}
							width={40}
							objectFit='cover'
							className='rounded-full'
						/>
					</div>
					<div className='flex flex-col'>
						<span className='font-bold'>
							{authors.data[0].attributes.name}
						</span>
						<span>
							{format(new Date(published), 'PPP', {
								locale: localeMap[locale],
							})}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostCard

import { useContext } from 'react'
import Link from 'next/link'

const CategoryRow = ({ categories, locale }) => {
	return (
		<div className='flex flex-wrap text-terracotta text-xs font-bold font-big-shoulders tracking-widest uppercase my-4 gap-2'>
			{categories.data.map((cat) => {
				const { name, slug } = cat.attributes
				return (
					<Link
						key={cat.id}
						href={`/${
							locale === 'en' ? '' : locale + '/'
						}category/${slug}`}
					>
						<a className='cursor-pointer'>
							<span key={cat.id}>{name}</span>
						</a>
					</Link>
				)
			})}
		</div>
	)
}

export default CategoryRow

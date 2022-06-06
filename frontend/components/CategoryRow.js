const CategoryRow = ({ categories }) => {
	return (
		<div className='flex text-terracotta text-xs font-bold font-big-shoulders tracking-widest uppercase mt-4 gap-x-2'>
			{categories.data.map((cat) => {
				const { name } = cat.attributes
				// TODO: Make these links
				return <span key={cat.id}>{name}</span>
			})}
		</div>
	)
}

export default CategoryRow

import PostCard from './PostCard'

const PostGrid = ({ posts }) => {
	return (
		<div className='grid h-full xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8'>
			{posts.map((post) => {
				return (
					<div key={post.id} className='col-span-1'>
						<PostCard post={post} />
					</div>
				)
			})}
		</div>
	)
}

export default PostGrid

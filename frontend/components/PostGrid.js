import PostCard from './PostCard'

const PostGrid = ({ posts }) => {
	return (
		<div className='grid grid-cols-post-grid gap-8 my-16'>
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

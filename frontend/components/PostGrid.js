import PostCard from './PostCard'

const PostGrid = ({ posts, marginTop = 16 }) => {
	return (
		<div className={`grid grid-cols-post-grid gap-8 pb-12 mt-${marginTop}`}>
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

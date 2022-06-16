import PostCard from './PostCard'

const PostGrid = ({ pages, marginTop = 12 }) => {
	return (
		<div className={`grid grid-cols-post-grid gap-8 pb-12 mt-${marginTop}`}>
			{pages?.map((page) =>
				page.data.posts.data.map((post) => (
					<div key={post.id} className='col-span-1'>
						<PostCard post={post} />
					</div>
				))
			)}
		</div>
	)
}

export default PostGrid

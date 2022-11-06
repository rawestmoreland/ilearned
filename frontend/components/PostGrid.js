import PostCard from './PostCard';

const PostGrid = ({ posts, marginTop = 8 }) => {
  return (
    <div className={`grid grid-cols-post-grid gap-8 pb-12 md:mt-${marginTop} mt-24`}>
      {posts.map(post => {
        return (
          <div key={post.id} className="col-span-1">
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostGrid;

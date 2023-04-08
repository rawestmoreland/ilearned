import NextImage from './NextImage';
import Link from 'next/link';

import AuthorRow from './AuthorRow';
import CategoryRow from './CategoryRow';

const PostCard = ({ post }) => {
  const { title, image, categories, description, authors, publishedAt, slug } = post.attributes;
  return (
    <div className="grid grid-cols-1 grid-rows-3 bg-off-white border rounded-lg h-full">
      <div className="relative row-span-1 top-0 left-0 w-full rounded-t-lg cursor-pointer p-4">
        <Link href={`/post/${slug}`}>

          <NextImage $className="rounded-lg" cover media={image} alt={image.data.attributes?.alternativeText || ''} />

        </Link>
      </div>
      <div className="row-span-2 flex flex-col h-full mx-4">
        <CategoryRow categories={categories} />
        <Link href={`/post/${slug}`} legacyBehavior>
          <h2 className="font-rubik font-bold text-xl mb-4 cursor-pointer">{title}</h2>
        </Link>
        <div className="font-merriweather text-sm leading-loose mb-4">
          <p className="line-clamp-6">{description}</p>
        </div>
        {authors.data[0] && <AuthorRow author={authors.data[0]} publishedAt={publishedAt} />}
      </div>
    </div>
  );
};

export default PostCard;

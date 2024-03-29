import { useContext } from 'react';
import Link from 'next/link';

import { GlobalContext } from '../pages/_app';

const CategoryRow = ({ categories }) => {
  const { locale } = useContext(GlobalContext);

  return (
    <div className="flex flex-wrap text-terracotta text-xs font-bold font-big-shoulders tracking-widest uppercase my-4 gap-2">
      {categories.data.map(cat => {
        const { name, slug } = cat.attributes;
        return (
          (<Link key={slug} href={`/category/${slug}`} className="cursor-pointer">

            <span key={cat.id}>{name}</span>

          </Link>)
        );
      })}
    </div>
  );
};

export default CategoryRow;

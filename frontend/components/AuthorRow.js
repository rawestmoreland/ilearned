import Link from 'next/link';
import NextImage from './NextImage';
import format from 'date-fns/format';
import { localeMap } from '../utils/localize';

const AuthorRow = ({ author, publishedAt, locale }) => {
  const { picture, name, slug } = author.attributes;
  return (
    <Link href={`/author/${slug}`} legacyBehavior>
      <div className="grid grid-cols-[40px_1fr] gap-x-2 items-center font-merriweather text-sm mb-4 [margin-block-start:auto] cursor-pointer">
        <div>
          <NextImage media={picture} $className="rounded-full" alt={picture.data.attributes?.alternativeText || ''} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span>
            {format(new Date(publishedAt), 'PPP', {
              locale: localeMap[locale],
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AuthorRow;

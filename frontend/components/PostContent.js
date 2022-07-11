import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import AuthorRow from './AuthorRow';
import CategoryRow from './CategoryRow';

const PostContent = ({ post }) => {
  const { title, authors, locale, published, categories, content } =
    post.attributes;
  return (
    <div className='bg-off-white my-12 rounded-md p-8 md:p-16'>
      <div className='mb-2'>
        <CategoryRow categories={categories} />
      </div>
      <h1 className='font-rubik text-4xl mb-8'>{title}</h1>
      {authors.data[0] && (
        <AuthorRow
          author={authors.data[0]}
          published={published}
          locale={locale}
        />
      )}
      <div className='mt-8'>
        <ReactMarkdown
          children={content}
          className='post-content font-rubik text-cod-gray'
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={dracula}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code
                  className='bg-gray-200 px-[3px] rounded text-xs'
                  {...props}
                >
                  {children}
                </code>
              );
            },
            a: ({ node, ...props }) => (
              <a className='text-link-blue underline' {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className='text-sm mb-2 text-cod-gray' {...props} />
            ),
            img: ({ node, ...props }) => (
              <img alt="" className='mx-auto my-8 md:max-w-[80%]' {...props} />
            ),
            ul: ({ node, ordered = false, ...props }) => (
              <ul className='text-sm list-disc ml-2 my-2' {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className='text-3xl text-cod-gray mb-2' {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className='text-2xl text-cod-gray my-2' {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className='text-xl text-cod-gray my-2' {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className='text-lg text-cod-gray my-2 font-medium'
                {...props}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default PostContent;

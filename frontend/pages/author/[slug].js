import { useEffect, useState } from 'react';

import InfininiteScroll from 'react-infinite-scroll-component';

import { fetchAPI, getPostsByAuthor } from '../../utils/api';
import Layout from '../../components/Layout';
import PostGrid from '../../components/PostGrid';
import Seo from '../../components/Seo';

import { getLocalizedPaths } from '../../utils/localize';

const Author = ({ posts, author, meta, locale, pageContext, ...pageProps }) => {
  // const { live } = pageProps?.adminSettings?.attributes;
  const { name, slug } = author.attributes;
  const [postsMeta, setPostsMeta] = useState(meta);
  const [postsData, setPostsData] = useState(posts);
  const seo = {
    metaTitle: author.attributes.name,
    metaDescription: `All ${author.attributes.name} posts`,
  };

  async function getMorePosts() {
    const postsRes = await getPostsByAuthor({
      slug,
      page: postsMeta.page + 1,
    });

    setPostsData([...postsData, ...postsRes.data.posts.data]);
    setPostsMeta(postsRes.data.posts.meta.pagination);
  }

  useEffect(() => {
    setPostsData(posts);
    setPostsMeta(meta);
  }, [posts]);

  return (
    <Layout live={true} pageContext={pageContext}>
      <Seo seo={seo} />
      <div>
        <div>
          <div className="mt-4 md:mt-8">
            <span className="text-terracotta font-big-shoulders tracking-widest font-extrabold">
              ARTICLES WRITTEN BY
            </span>
            <h1 className="text-off-white font-rubik text-5xl">{name.toUpperCase()}</h1>
          </div>
          <InfininiteScroll
            dataLength={postsData.length}
            next={getMorePosts}
            loader={<h4>Loading...</h4>}
            hasMore={postsMeta.pageCount > postsMeta.page}
          >
            <PostGrid posts={postsData} marginTop={4} />
          </InfininiteScroll>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths(context) {
  const authors = await fetchAPI('/authors', false, {
    fields: ['slug'],
  });

  const paths = authors.data.map(author => {
    const { slug } = author.attributes;

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale } = context;
  const matchingPosts = await getPostsByAuthor({
    slug: params.slug,
    page: 1,
  });

  const pageContext = {
    pageName: 'author',
    locale,
    locales,
    defaultLocale,
    slug: params.slug,
  };

  return {
    props: {
      posts: matchingPosts.data.posts.data,
      author: matchingPosts.data.authors.data[0],
      meta: matchingPosts.data.posts.meta.pagination,
      pageContext,
    },
  };
}

export default Author;

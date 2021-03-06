import { useEffect, useState } from 'react';

import InfininiteScroll from 'react-infinite-scroll-component';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PostGrid from '../components/PostGrid';

import { fetchAPI } from '../utils/api';
import { getLocalizedPaths } from '../utils/localize';

export default function Home({ posts, pageContext, ...pageProps }) {
  const [postsData, setPostsData] = useState(posts.data);
  const [postsMeta, setPostsMeta] = useState(posts.meta.pagination);
  const { live } = pageProps.adminSettings.attributes;
  const { locale } = pageContext;

  async function getMorePosts() {
    const morePostsRes = await fetchAPI('/posts', false, {
      locale,
      sort: 'published:desc',
      populate: {
        authors: { populate: ['picture'] },
        image: '*',
        categories: '*',
        meta: '*',
      },
      pagination: {
        page: postsMeta.page + 1,
        pageSize: 10,
        withCount: true,
      },
    });

    setPostsData([...postsData, ...morePostsRes.data]);
    setPostsMeta(morePostsRes.meta.pagination);
  }

  useEffect(() => {
    setPostsData(posts.data);
    setPostsMeta(posts.meta.pagination);
  }, [posts]);

  return (
    <Layout live={live} pageContext={pageContext}>
      <Seo seo={pageContext.seo} />
      <InfininiteScroll
        dataLength={postsData.length}
        next={() => getMorePosts()}
        loader={<h4>Loading...</h4>}
        hasMore={postsMeta.pageCount > postsMeta.page}
      >
        <PostGrid posts={postsData} />
      </InfininiteScroll>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const { locale, locales, defaultLocale } = ctx;
  // Run API calls in parallel
  const [postsRes, homepageRes] = await Promise.all([
    fetchAPI('/posts', false, {
      locale: ctx.locale,
      sort: 'published:desc',
      pagination: {
        page: 1,
        pageSize: 10,
        withCount: true,
      },
      populate: {
        authors: { populate: ['picture'] },
        image: '*',
        categories: '*',
        meta: '*',
      },
    }),
    fetchAPI('/homepage', false, {
      locale: ctx.locale,
      populate: '*',
    }),
  ]);

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug: '',
    seo: homepageRes.data.attributes.seo,
  };

  const localizedPaths = getLocalizedPaths(pageContext);

  return {
    props: {
      posts: postsRes,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  };
}

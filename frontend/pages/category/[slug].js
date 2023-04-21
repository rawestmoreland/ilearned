import { useEffect, useState } from 'react';

import InfininiteScroll from 'react-infinite-scroll-component';

import Layout from '../../components/Layout';
import PostGrid from '../../components/PostGrid';
import Seo from '../../components/Seo';

import { fetchAPI, getPostsByCategory } from '../../utils/api';

const Category = ({ posts, category, meta, pageContext, ...pageProps }) => {
  const { name, slug } = category?.attributes;
  const [postsMeta, setPostsMeta] = useState(meta);
  const [postsData, setPostsData] = useState(posts);
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} posts`,
  };

  async function getMorePosts() {
    const postsRes = await getPostsByCategory({
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
            <span className="text-terracotta font-big-shoulders tracking-widest font-extrabold">ARTICLES TAGGED</span>
            <h1 className="text-off-white font-rubik text-5xl">{name.toUpperCase()}</h1>
          </div>
          <InfininiteScroll
            dataLength={postsData.length}
            next={() => getMorePosts()}
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
  const categories = await fetchAPI('/categories', false, {
    fields: ['slug'],
  });

  const paths = categories.data.map(category => {
    const { slug } = category.attributes;

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
  const matchingPosts = await getPostsByCategory({
    slug: params.slug,
    page: 1,
  });

  const pageContext = {
    pageName: 'category',
    locale,
    locales,
    defaultLocale,
    slug: params.slug,
  };

  return {
    props: {
      posts: matchingPosts.data.posts.data,
      category: matchingPosts.data.categories?.data[0] || null,
      meta: matchingPosts.data.posts.meta.pagination,
      pageContext,
    },
    revalidate: 90,
  };
}

export default Category;

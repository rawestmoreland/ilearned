import GiscussComments from '../../components/GiscusComments';
import Layout from '../../components/Layout';
import PostContent from '../../components/PostContent';
import Seo from '../../components/Seo';

import { fetchAPI, getPostsBySlug } from '../../utils/api';
import Custom404 from '../404';

const Post = ({ post, error, pageContext, preview, ...pageProps }) => {
  const { metaTitle, metaDescription, metaImage } = post?.attributes.seo || {};
  const seo = {
    metaTitle,
    metaDescription,
    shareImage: metaImage,
    article: true,
  };
  if (!error && post) {
    return (
      <Layout live={true} pageContext={pageContext} preview={preview}>
        <Seo seo={seo} />
        <PostContent post={post} />
      </Layout>
    );
  }

  return <Custom404 pageContext={pageContext} noTranslation={!post} />;
};

export async function getStaticPaths(context) {
  const posts = await context.locales.reduce(async (currentPostsPromise, locale) => {
    const currentPosts = await currentPostsPromise;
    const localePosts = await fetchAPI('/posts', false, {
      locale,
      fields: ['slug', 'locale'],
    });
    return [...currentPosts, ...localePosts.data];
  }, Promise.resolve([]));

  const paths = posts.map(post => {
    const { slug, locale } = post.attributes;

    return {
      params: { slug },
      // Specify the locale to render
      locale,
    };
  });

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context;

  const postData = await getPostsBySlug({
    slug: params.slug,
    locale: 'all',
    preview,
  });

  const pageContext = {
    pageName: 'post',
    locale,
    locales,
    defaultLocale,
    slug: params.slug,
  };

  if (!postData.data.posts.data.length || postData.errors) {
    return {
      props: {
        post: null,
        error: true,
        pageContext,
      },
      revalidate: 90,
    };
  }

  return {
    props: {
      preview,
      post: [postData.data.posts.data[0]][0],
      pageContext,
    },
    revalidate: 90,
  };
}

export default Post;

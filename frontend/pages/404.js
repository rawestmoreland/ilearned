import Layout from '../components/Layout';

const Custom404 = ({ live = true, noTranslation = false, pageContext }) => {
  return (
    <Layout live={live} pageContext={pageContext}>
      <div className="flex w-full items-center justify-center text-off-white text-xl font-big-rubik font-bold tracking-wider mt-80">
        {noTranslation ? (
          <h1>😢 Sorry, we haven't translated that page yet 😢</h1>
        ) : (
          <h1>😢 Sorry, we couldn&apos;t find that page 😢</h1>
        )}
      </div>
    </Layout>
  );
};

export default Custom404;

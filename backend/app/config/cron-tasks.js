module.exports = {
  // every one minute
  "*/1 * * * *": async ({ strapi }) => {
    // fetch articles to publish
    console.log(`looking for things to publish at ${new Date()}`);
    const draftArticlesToPublish = await strapi.db
      .query("api::post.post")
      .findMany({
        where: {
          publishedAt: null,
          published: { $lt: new Date() },
          auto_publish: true,
        },
      });

    await Promise.all(
      draftArticlesToPublish.map(async (post) => {
        console.log(`Publishing ${post.title}`);
        return await strapi.db.query("api::post.post").update({
          where: { id: post.id },
          data: {
            publishedAt: new Date(),
          },
        });
      })
    );
  },
};

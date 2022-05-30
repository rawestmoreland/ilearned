module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    const { email, token } = data;
    console.log(`Before create: ${email}`);
    data.token = Buffer.from(email).toString("base64");
    const userCheck = await strapi.db
      .query("api::subscriber.subscriber")
      .findOne({ where: { email } });
    if (userCheck !== null) {
      await strapi
        .service("api::subscriber.subscriber")
        .sendVerify(email, token);
    }
  },
  async afterCreate(event) {
    const { result } = event;
    const { email, token } = result;
    if (result) {
      await strapi
        .service("api::subscriber.subscriber")
        .sendVerify(email, token);
    }
  },
};

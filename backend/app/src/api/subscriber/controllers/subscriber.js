"use strict";

/**
 *  subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async cancelSub(ctx) {
      const { token } = ctx.params;
      const user = await strapi.db
        .query("api::subscriber.subscriber")
        .findOne({ where: { token } });
      if (user) {
        const updatedUser = await strapi.db
          .query("api::subscriber.subscriber")
          .update({ where: { token }, data: { activated: false } });
        return updatedUser;
      }
    },
    async confirmSub(ctx) {
      const { token } = ctx.params;
      const user = await strapi.db
        .query("api::subscriber.subscriber")
        .findOne({ where: { token } });
      if (user) {
        const updatedUser = await strapi.db
          .query("api::subscriber.subscriber")
          .update({ where: { token }, data: { activated: true } });
        return updatedUser;
      }
    },
  })
);

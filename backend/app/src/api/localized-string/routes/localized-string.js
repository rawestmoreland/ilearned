'use strict';

/**
 * localized-string router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::localized-string.localized-string');

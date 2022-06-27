'use strict';

/**
 * localized-string service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::localized-string.localized-string');

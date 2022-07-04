const parse = require("pg-connection-string").parse;
const config = process.env.DATABASE_URL || process.env.HEROKU_POSTGRESQL_COPPER ? parse(
  process.env.DATABASE_URL || process.env.HEROKU_POSTGRESQL_COPPER
) : null;
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config?.host || "127.0.0.1",
      port: config?.post || 5432,
      database: config?.database || "strapi",
      user: config?.user || "strapi",
      password: config?.password || "strapi",
      ssl: !config ? false : { rejectUnauthorized: false },
    },
    debug: false,
  },
});

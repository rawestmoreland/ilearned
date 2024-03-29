'use strict';

/**
 * subscriber service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscriber.subscriber', ({ strapi }) => ({
  sendVerify: async (email, token) => {
    const baseURL = `${
      process.env.NODE_ENV === 'production' ? process.env.NEXT_ILEARNED_PUBLIC_URL : 'http://localhost:3000'
    }`;
    try {
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: 'richard@ilearnedathing.com',
        replyTo: 'richard@ilearnedathing.com',
        subject: 'Confirm your email for ilearnedathing.com',
        text: `${baseURL}/confirm?token=${token}`,
        html: `
        <div style="width:100%; height:100%;">
          <table style="margin:0 auto; text-align:center;">
            <tr>
              <td><h1>🧠 I Learned a Thing Newsletter 🧠</h1></td>
            </tr>
            <tr>
              <td><h2>Please confirm your email</h2></td>
            </tr>
            <tr>
              <td>
                <a href="${baseURL}/confirm?token=${token}">Click here to confirm your email</a>
              </td>
            </tr>
          </table>
        </div>`,
      });
    } catch (e) {
      console.log(e[0].messages);
    }
  },
}));

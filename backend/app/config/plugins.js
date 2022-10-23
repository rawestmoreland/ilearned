module.exports = ({ env }) => ({
  chartbrew: true,
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: env('EMAIL_PROVIDER'),
      providerOptions: {
        host: env('EMAIL_SMTP_HOST'),
        port: env('EMAIL_SMTP_PORT'),
        auth: {
          user: env('EMAIL_SMTP_USER'),
          pass: env('EMAIL_SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS_FROM'),
        defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
      },
    },
  },
  'generate-data': {
    enabled: true,
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 15,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});

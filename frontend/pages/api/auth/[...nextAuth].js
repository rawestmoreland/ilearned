import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  theme: {
    colorScheme: 'light',
    brandColor: '#FFC300',
    logo: 'https://res.cloudinary.com/wiferm-llc/image/upload/v1653920812/ilearned/ILAT_logo_ad217a6eb5.svg',
    buttonText: '#575757',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      session.id = token.id;
      return Promise.resolve(session);
    },
    jwt: async ({ token, account, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const resData = await response.json();
        token.jwt = resData.jwt;
        token.id = resData.user.id;
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

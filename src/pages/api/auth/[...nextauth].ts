import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    }
  },
  providers: [
    GithubProvider({
      clientId: process.env.APP_ID as string,
      clientSecret: process.env.APP_SECRET as string,
    }),
  ],
});

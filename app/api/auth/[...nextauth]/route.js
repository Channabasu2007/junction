import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");
        if (!user.verified) throw new Error("Email not verified");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Invalid credentials");

        return user;
      },
    }),
 GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider === "github") {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user for GitHub OAuth
          const newUser = await User.create({
            email: user.email,
            firstname: user.name?.split(' ')[0] || 'GitHub',
            lastname: user.name?.split(' ').slice(1).join(' ') || 'User',
            password: '', // No password needed for OAuth users
            verified: true, // GitHub users are automatically verified
            userName: '', // Will be set later in setup flow
            isPremium: true,
            otp: '',
            otpExpires: new Date(),
          });
          
          // Update the user object with the created user's data
          user._id = newUser._id;
          user.firstname = newUser.firstname;
          user.lastname = newUser.lastname;
          user.userName = newUser.userName;
          user.verified = newUser.verified;
          user.isPremium = newUser.isPremium;
        } else {
          // Update the user object with existing user's data
          user._id = existingUser._id;
          user.firstname = existingUser.firstname;
          user.lastname = existingUser.lastname;
          user.userName = existingUser.userName;
          user.verified = existingUser.verified;
          user.isPremium = existingUser.isPremium;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.userName = user.userName;
        token.verified = user.verified;
        token.isPremium = user.isPremium;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.verified = token.verified;
        session.user.isPremium = token.isPremium;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

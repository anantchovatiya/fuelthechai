import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDB'
export const authoptions =  NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: 'Ov23li0z90VssG3uRSfz',
      clientSecret: 'c24be4122f7c0ac7a0dd12202b71ef63ee9e23dd'
    }),
     GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,  // Use the client ID from .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Use the client secret from .env.local
    })
  ],
  callbacks: {
    async signIn({ user, account, profile}) {
      if(account.provider === 'github' || account.provider === 'google') {
        connectDB();
        const currentuser = await User.findOne({email: profile.email})
        if(!currentuser) {
          //create a new user
          const newuser = await User.create({
            email: profile.email,
            username: profile.email.split('@')[0]
          })
          await newuser.save();
        }

      }
      return true;
    }
  },
  async session({ session, user, token }) {
    const dbUser = await User.findOne({email: session.user.email});
    session.user.name = dbUser.username;
    return session;
  },
})

export { authoptions as GET, authoptions as POST };
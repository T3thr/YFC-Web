import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/backend/models/User";
import mongodbConnect from "@/backend/lib/mongodb";
import bcrypt from "bcryptjs";

export const options = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        async authorize(credentials) {
          // Connect to MongoDB
          await mongodbConnect();
  
          // Find user by email in the database
          const user = await User.findOne({ email: credentials.email }).select("+password");
  
          // If user is not found, throw an error
          if (!user) {
            throw new Error("No user found with this email");
          }
  
          // Compare provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  
          // If password is invalid, throw an error
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
  
          // Return user data without the password field
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt({ token, user }) {
        // If user data is available, attach it to the token
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.role = user.role;
          token.avatar = user.avatar;
        }
        return token;
      },
      async session({ session, token }) {
        // Attach token data to the session
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        return session;
      },
    },
  };
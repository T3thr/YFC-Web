import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/backend/models/User";
import mongodbConnect from "@/backend/lib/mongodb";
import bcrypt from "bcryptjs";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await mongodbConnect();

        // Find user by email
        const user = await User.findOne({ email: credentials.email }).select("+password");

        // If user is not found, check if it matches the admin credentials
        if (!user) {
          const adminUser = {
            userId: 'admin',
            username: 'admin',
            password: '123',
            name: 'Admin',
            email: 'jadmin@email.com',
            image: 'asdfasdfasdf.jpg',
          };

          // Verify admin credentials
          if (credentials?.email === adminUser.email && credentials?.password === adminUser.password) {
            return {
              id: adminUser.userId,
              name: adminUser.name,
              email: adminUser.email,
              avatar: adminUser.image,
              role: 'admin', // Assign role as admin
            };
          } else {
            throw new Error("Incorrect email or password");
          }
        }

        // Compare provided password with the stored hashed password for normal users
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        // If password is invalid, throw an error
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        // Return user data without the password field
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'user', // Default role for normal users
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
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
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
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.avatar = token.avatar;
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Specify custom signin page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;

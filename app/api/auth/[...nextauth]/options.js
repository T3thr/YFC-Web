import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/backend/models/User";
import mongodbConnect from "@/backend/lib/mongodb";
import bcrypt from "bcryptjs";

export const options = {
  providers: [
    // User credentials provider
    CredentialsProvider({
        name: "User Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "Enter your email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await mongodbConnect();
    
            const user = await User.findOne({ email: credentials.email }).select("+password");
    
            if (!user) {
            throw new Error("No user found with this email");
            }
    
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    
            if (!isPasswordValid) {
            throw new Error("Incorrect password");
            }
    
            return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,  // Ensure this is included in the user model
            avatar: user.avatar,
            };
        },
        }),
    // กำหนดการยืนยันตัวตนสำหรับใช้กับ username/password
    CredentialsProvider({
        name: "Admin Credentials",
        // กำหนดอินพุตในแบบฟอร์ม ซึ่งได้แก่ username และ password  
        credentials: {
          username: { label: "Username", type: "text", placeholder: "Enter your username" },
          password: { label: "Password", type: "password" },
        },
        // ฟังก์ชันสำหรับรีเทิร์นข้อมูลที่ต้องการไปให้กับผู้ใช้ เมื่อเข้าสู่ระบบแล้ว 
        async authorize(credentials, request) {
            // ขอข้อมูลจากฐานข้อมูล
            const user = {
                id: 'admin',
                username: 'admin',
                password: '123456',
                name: 'Admin User',
                email: 'admin@yokyok.com',
                role: 'admin',
                avatar: 'admin-avatar.jpg'
                };
            // ตรวจสอบ username และ password ว่าถูกต้องหรือไม่
            if (credentials?.username === user.username && credentials?.password === user.password) {
                return user;
                } else {
                    return null
                }
        },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async authorize(credentials) {
        // Implement Google OAuth logic to determine if user is admin
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (user && user.role === 'admin') {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          };
        }

        return null;  // No access for non-admins
      }
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

  secret: process.env.NEXTAUTH_SECRET,
};

export default options;

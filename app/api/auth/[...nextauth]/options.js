import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import mongodbConnect from '@/backend/lib/mongodb'; // Import your MongoDB connection utility
import User from '@/backend/models/User'; // Adjust path as needed
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export const options = {
    providers: [
        // กำหนดการยืนยันตัวตนสำหรับใช้กับ username/password
        CredentialsProvider({
            name: 'Username/Password',
            // กำหนดอินพุตในแบบฟอร์ม ซึ่งได้แก่ username และ password
            credentials: {
                username: {label:'Username', type:'text', placeholder:'username'},
                password: {label:'Password', type:'password'}
            },
            // ฟังก์ชันสำหรับรีเทิร์นข้อมูลที่ต้องการไปให้กับผู้ใช้ เมื่อเข้าสู่ระบบแล้ว 
            async authorize(credentials) {
                await mongodbConnect();
        
                const user = await User.findOne({ email: credentials.username });
                if (!user) {
                  throw new Error('No user found with this email');
                }
        
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                  throw new Error('Incorrect password');
                }
        
                return { id: user._id, name: user.name, email: user.email, image: user.image };
              },
            }),
        // กำหนดการยืนยันตัวตนสำหรับใช้กับบัญชี google
        GoogleProvider({
            name: 'Google',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
}
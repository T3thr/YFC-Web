import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options = {
    providers : [
        CredentialsProvider({
            name: 'User/Password',
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password', }
            },
            async authorize(credentials,request) {
                const user = {
                    userId: '101',
                    username: 'theerapat',
                    password: '12345678',
                    name: 'Theerapat Poo',
                    email: 'theerapatpo66@nu.ac.th',
                    image: 'hello.jpg'
                }
                if(credentials?.username === user.username && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            name : 'Google',
            clientId: process.env.GOOGGLE_CLIENT_ID,
            clientSecret: process.env.GOOGGLE_CLIENT_SECRET,
        }),
    ]
}
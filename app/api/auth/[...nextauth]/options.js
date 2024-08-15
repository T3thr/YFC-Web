// อิมพอร์ต GoogleProvider สำหรับใช้ยืนยันตัวตนด้วย google
import GoogleProvider from 'next-auth/providers/google'

// กำหนดรายละเอียดต่าง ๆ ลงไปในออบเจ็กต์ options (AuthOptions)
export const options = {
    providers: [
        // กำหนดรายละเอียดลงไปใน GoogleProvider 
        GoogleProvider({
            name: 'Google',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ]
}
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import connectDB from "@/config/db"
import User from "@/model/User"
// import { signIn } from "next-auth/react"

export const authOptions = {
    providers : [
        CredentialsProvider({
            id: 'credientals',
            name: 'credientals',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                },

            },
            async authorize(credentials){
                await connectDB()
                try {
                    const user = await User.findOne({email:credentials.email})
                    console.log("heelp")
                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if(isPasswordCorrect){
                            return user;
                        }
                    }
                    
                } catch (error) {
                    throw new Error(error);
                }
            }

        })
    ],
    callbacks : {
        async signIn({user, account}){
            if(account?.provider == 'credientals'){
                return true;
            }
        }
    }
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

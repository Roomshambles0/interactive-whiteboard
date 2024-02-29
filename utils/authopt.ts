import { NextAuthOptions } from "next-auth";

import { Pclient } from "@/utils/prismaclient"; 

import bcrypt from "bcrypt"

import CredentialsProvider from "next-auth/providers/credentials"
import { Provider } from "next-auth/providers/index";





 export const authOptions:NextAuthOptions = {

    providers:[
        CredentialsProvider({
          id: "admin",
          name: "admin Credentials",
          type: "credentials",
          credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
          },
            async authorize(credentials,req) {
              if (!credentials?.username || !credentials?.password) {
                throw new Error('Invalid credentials');
              }
              console.log(credentials)
      
            const User = await Pclient.user.findUnique({
                where:{
                    name:credentials.username
                }
            })
              console.log(User,"user")
            if(!User){
                return null
            }else{

                const ispasswordcorrect =await bcrypt.compare(
                    credentials.password,
                    User.hashedpassword
                  ); 

                  console.log(ispasswordcorrect)
                  if(!ispasswordcorrect){
                  return null
                  }
            }
      
              return User
            }

             
          })
    ] as Provider[],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    
      
}
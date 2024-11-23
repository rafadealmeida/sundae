// import { getServerSession, NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { api } from "@/src/lib/api";
// import {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//     exp?: number;
//   }
// }

// declare module "next-auth" {
//   interface User {
//     accessToken?: string;
//     refreshToken?: string;
//     expiration?: number;
//     name?: string;
//     image?: string;
//   }

//   interface Session {
//     accessToken?: string;
//     refreshToken?: string;
//     user: {
//       name?: string;
//       image?: string;
//     };
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Liferay",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         try {
//           const { data: tokenUser } = await api.post<{
//             access_token: string;
//             refresh_token: string;
//           }>(
//             `/o/oauth2/token?grant_type=password&client_id=${
//               process.env.LIFERAY_CLIENT_ID
//             }&username=${encodeURIComponent(
//               credentials.email
//             )}&password=${encodeURIComponent(credentials.password)}`,
//             null,
//             {
//               headers: {
//                 Accept: "*/*",
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//             }
//           );

//           console.log("tokenUser :>> ", tokenUser);

//           if (tokenUser.access_token) {
//             // Fetch user info using the access token
//             const { data: userData } = await api.get(
//               "/o/headless-admin-user/v1.0/my-user-account",
//               {
//                 headers: { Authorization: `Bearer ${tokenUser.access_token}` },
//               }
//             );
//             console.log("response.data", userData);

//             return {
//               id: `${userData.id}`,
//               name: `${userData.name}`,
//               email: userData.emailAddress,
//               accessToken: tokenUser.access_token,
//               refreshToken: tokenUser.refresh_token,
//             };
//           }

//           return null;
//         } catch (error) {
//           console.error("Authorization error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, authOptions);
// }

import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
  }
}

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    expiration?: number;
    name?: string;
    image?: string;
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      name?: string;
      image?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Fake Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // This is a fake auth provider. In a real scenario, you'd check the credentials against your auth system
        if (
          credentials.email === "rafa@email.com" &&
          credentials.password === "teste"
        ) {
          return {
            id: "1",
            name: "Rafael Almeida",
            email: "rafael.almeida@example.com",
            image: "https://avatars.githubusercontent.com/u/93219825?v=4",
            accessToken: "fake_access_token",
            refreshToken: "fake_refresh_token",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = {
        ...session.user,
        name: "Rafael Almeida",
        image: "https://avatars.githubusercontent.com/u/93219825?v=4",
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

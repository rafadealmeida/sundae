import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/src/lib/api";
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
      name: "Liferay",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data: tokenData } = await api.post<{
            access_token: string;
            refresh_token: string;
          }>(
            `/o/oauth2/token?grant_type=password&client_id=${
              process.env.LIFERAY_URL
            }&username=${encodeURIComponent(
              credentials.email
            )}&password=${encodeURIComponent(credentials.password)}`,
            null,
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (tokenData.access_token) {
            // Fetch user info using the access token
            const { data: userData } = await api.get(
              "/api/jsonws/user/get-current-user",
              {
                headers: {
                  Authorization: `Bearer ${tokenData.access_token}`,
                },
              }
            );
            console.log("response.data", userData);

            return {
              id: userData.userId.toString(),
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.emailAddress,
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
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
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
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

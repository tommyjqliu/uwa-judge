import type { NextAuthOptions } from "next-auth";
import passwordProvider from "./password-provider";
import { azureAdProvider, providerId as azureId } from "./azure-provider";
import { providerId as credentialsId } from "./password-provider";
import { uwajudgeDB } from "../database-client";

export const authConfig = {
  providers: [passwordProvider, azureAdProvider],
  callbacks: {
    /**
     * ref: https://next-auth.js.org/configuration/callbacks#session-callback
     */
    async jwt(params) {
      console.log("jwt", params);
      const { token, account, profile, user } = params;
      if (account) {
        // Has account in params means callback is called after login
        if (account.provider === azureId) {
          const userId = (
            await uwajudgeDB.externalAccount.findFirst({
              where: {
                provider: azureId,
                providerId: account.providerAccountId as string,
              },
            })
          )?.userId;

          let user =
            userId !== undefined &&
            (await uwajudgeDB.user.findFirst({
              where: {
                id: userId,
              },
            }));

          if (!user) {
            user = await uwajudgeDB.user.create({
              data: {
                username: (profile as any)?.preferred_username,
                // name: profile?.name,
                email: profile?.email,
                externalAccounts: {
                  create: {
                    provider: azureId,
                    providerId: account.providerAccountId,
                  },
                },
              },
            });
          }
          token.userId = user.id;
        }

        if (account.provider === credentialsId) {
          token.userId = token.sub && +token.sub;
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId as string,
        },
      };
    },
  },
} satisfies NextAuthOptions;

export default authConfig;

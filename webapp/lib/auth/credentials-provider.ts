import CredentialsProvider from "next-auth/providers/credentials";
import { uwajudgeDB } from "../database-client";
import bcrypt from "bcrypt";

export const providerId = "username-password";
export const credentialsProvider = CredentialsProvider({
  id: providerId,
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials (Auto Sign Up)",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.

  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials, req) {
    const { username, password } = credentials || {};
    console.log("credentials authorize", credentials);
    if (!username || !password) {
      return null;
    }
    console.log("credentials authorize", credentials);
    const hashedPassword = password && (await bcrypt.hash(password, 10));
    console.log("hashedPassword", 11);
    const user =
      username &&
      (await uwajudgeDB.user.findFirst({
        where: {
          username,
        },
      }));
    console.log("user", user);
    if (user) {
      // Any object returned will be saved in `user` property of the JWT
      if (
        password &&
        user.password &&
        (await bcrypt.compare(password, user.password))
      ) {
        return {
          ...user,
          id: user.id.toString(),
          password: undefined,
        };
      }
      // If you return null then an error will be displayed advising the user to check their details.
      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      return null;
    } else {
      const user = await uwajudgeDB.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    
      return {
        ...user,
        id: user.id.toString(),
        password: undefined,
      };
    }
  },
});

export default credentialsProvider;

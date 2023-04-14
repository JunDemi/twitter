import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
      user?: {
        name: string;
      };
    }
  }
  

const cookieOptions = {
    cookieName: "twitter_session",
    password: "hey8B7vGSbXVQqH8JWZgZVrrS8Vp6DyC3aB8d7jW"!
}

export function withApiSession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}
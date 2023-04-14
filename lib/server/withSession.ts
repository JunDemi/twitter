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
    password: process.env.COOKIE_PASSWORD!
}

export function withApiSession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}
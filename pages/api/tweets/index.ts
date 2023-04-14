import client from "../../../lib/server/client";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    if(req.method === "GET"){
        const tweets = await client.tweets.findMany({
          include: {
            _count: {
              select: {
                favs: true,
              }
            }
          }
        });
        res.json({
            ok: true,
            tweets
        });
    }
    if(req.method === "POST"){
        const {
            body: { title, tweet },
            session: { user },
          } = req;
          const createTweet = await client.tweets.create({
            data: {
                title,
                text: tweet,
                user: {
                    connect: {
                        name:user?.name
                    }
                }
            }
          });
          const profile = await client.user.findUnique({
            where: { name: req.session.user?.name },
          });
          res.json({
            ok: true,
            createTweet,
          });
    }
}
export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);

import client from "../../../../lib/server/client";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: {id},
    session: {user}
  } = req;
  const tweet = await client.tweets.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  
  const isLiked = Boolean(
    await client.fav.findFirst({
        where: {
            tweetId: tweet?.id,
            userName: user?.name
        },
        select: {
            id: true
        }
      })
  );
  
  res.json({
    ok: true,
    tweet,
    isLiked
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);

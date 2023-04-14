import client from "../../../../lib/server/client";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withSession";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user }
  } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      tweetId: Number(id),
      userName: user?.name
    }
  });
  if(alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id
      }
    });
  }else{
    await client.fav.create({
      data: {
        user: {
          connect: {
            name: user?.name
          }
        },
        tweet: {
          connect: {
            id: Number(id),
          }
        }
      }
    });
  }
  res.json({
    ok: true
  });
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);

import client from "../../../lib/server/client";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  const {nickname} = req.body;

  if(!nickname) return res.status(400).json({ok: false});
 
  const foundName = await client.user.findUnique({
    where: {
      name: nickname
    }
  });

  if (!foundName) return res.status(404).end();

  req.session.user = {
    name: nickname
  };

  await req.session.save();

  return res.json({
    ok: true
  });
}

export default withApiSession(withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false
}));

import client from "../../../lib/server/client";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  const {nickname} = req.body;

  if(!nickname) return res.status(400).json({ok: false});
  
  const signUp = await client.user.create({
    data: {
      name: nickname,
      },
  });
  return res.json({
    ok: true
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false
});

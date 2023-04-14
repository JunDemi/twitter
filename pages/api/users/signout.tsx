import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

req.session.destroy();

  return res.json({
    ok: false
  });
}

export default withApiSession(withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false
}));

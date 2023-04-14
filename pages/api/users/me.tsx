// import client from "../../../lib/server/client"; 
// import withHandler, { ResponseType } from "../../../lib/server/withHandler"; 
// import { NextApiRequest, NextApiResponse } from "next";
// import { withApiSession } from "../../../lib/server/withSession";

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseType>
// ) {
//   const profile = await client.user.findUnique({
//     where: { id: req.session.user?.id },
//   });
//   res.json({
//     ok: true,
//     profile,
//   });
// }
// export default withApiSession(
//   withHandler({
//     methods: ["GET"],
//     handler
//   })
// );

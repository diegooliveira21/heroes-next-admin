import { NowRequest, NowResponse } from '@vercel/node';
import User from '@models/user.model';
import connectToDb from '@api/db';

export default async (
  request: NowRequest,
  response: NowResponse,
): Promise<void> => {
  await connectToDb();

  const { email, password } = request.body;

  return User.findOne({ email, password })
    .orFail(error => {
      response.status(401);
      response.json({ body: error });
    })
    .exec()
    .then(user => {
      response.status(200);
      response.json({ body: user });
    });
};

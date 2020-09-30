import { NowRequest, NowResponse } from '@vercel/node';
import connectToDb from '@api/db';
import User from '@models/user.model';

export default async (
  request: NowRequest,
  response: NowResponse,
): Promise<void> => {
  await connectToDb();

  const { email, password } = request.body;

  const user = new User({ email, password });

  return user.save()
    .then(dbResponse => {
      response.status(200);
      response.json({ body: dbResponse });
    }).catch(dbError => {
      response.status(401);
      response.json({ body: dbError });
    });
};

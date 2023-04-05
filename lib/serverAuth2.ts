import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../lib/prismadb';
import { authOptions } from './auth';
import { getServerSession } from 'next-auth';

const serverAuth2 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error('Not signed in');
  }
  return { currentUser };
};

export default serverAuth2;
// then, you need to change a little on the favorite.ts ( api ) 

// from
// const { currentUser } = await serverAuth(req);

// to 
// const { currentUser } = await serverAuth2(req, res); 
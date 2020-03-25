import { decodeToken } from './token';
const context = async ({ req }) => {

  const auth = req.headers.authorization;
  const token = auth && auth.sustring(7);

  if(token) {

    try {
      const decoded = await decodeToken(token);

      if(new Date(decoded.exp * 1000) < new Date()){
        throw new Error('Access denied, token expired!')
      }

      return decoded;

    } catch (error) {
      throw new Error('Access denied, expired or invalid token!')
    }

  }else 
    throw new Error('Invalid token !');
}

export {
  context
}
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


interface TokenPayload {
  sub: string;
}

export async function ensureAuthenticatedDeliveryman(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "token is missing",
    })

  }
  const [, token] = authHeader.split(' ');


  try {

    const { sub } = verify(token, "d5e21cb6fbcdf4c101bb8a9f5cc97c6b") as TokenPayload;

    request.id_deliveryman = sub,


      console.log(sub);
    return next();

  } catch (err) {
    return response.status(401).json({
      message: "invalid token!",
    })
  }
}

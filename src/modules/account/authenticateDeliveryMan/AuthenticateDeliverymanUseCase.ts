import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })
    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }
    const token = sign({ username }, "d5e21cb6fbcdf4c101bb8a9f5cc97c6b", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })
    return token

  }
}

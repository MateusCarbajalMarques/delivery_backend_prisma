import { Request, Response } from 'express';
import { FindAllWithouEndDateUseCase } from './FindAllWithouEndDateUseCase';
export class FindAllWithoutEndDateController {
  async handle(request: Request, response: Response) {
    const findAllWithouEndDateUseCase = new FindAllWithouEndDateUseCase();
    const result = await findAllWithouEndDateUseCase.execute();

    return response.json(result);

  }
}

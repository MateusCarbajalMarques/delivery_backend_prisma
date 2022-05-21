import { Request, Response } from 'express';
import { FinAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';


export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {

    const { id_client } = request;
    const finAllDeliveriesUseCase = new FinAllDeliveriesUseCase();
    const result = await finAllDeliveriesUseCase.execute(id_client);

    return response.json(result);

  }
}

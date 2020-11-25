import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class FindOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Order | undefined> {
    const getOrder = await this.ordersRepository.findById({ order_id });

    if (!getOrder) throw new AppError('Order does not exists');

    return getOrder;
  }
}

export default FindOrderService;

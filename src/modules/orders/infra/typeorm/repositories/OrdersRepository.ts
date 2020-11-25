import { getRepository, Repository } from 'typeorm';

import IOrdersRepository, {
  FindByIdProps,
  CreateOrderProps,
} from '@modules/orders/repositories/IOrdersRepository';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    customer,
    products,
  }: CreateOrderProps): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      ordersProduct: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findById({
    order_id,
  }: FindByIdProps): Promise<Order | undefined> {
    const getOrder = await this.ormRepository.findOne(order_id, {
      relations: ['ordersProduct', 'customer'],
    });

    return getOrder;
  }
}

export default OrdersRepository;

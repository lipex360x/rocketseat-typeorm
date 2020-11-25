import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  product_id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const getCustomer = await this.customersRepository.findById({
      customer_id,
    });

    if (!getCustomer) throw new AppError('User does not exists');

    const arrayProductsIds = products.map(product => product.product_id);

    const getProducts = await this.productsRepository.findAllById({
      product_ids: arrayProductsIds,
    });

    const arraySizeProducts = getProducts.filter(product => product);
    if (arraySizeProducts.length !== arrayProductsIds.length) {
      throw new AppError('One or more products does not exists');
    }

    const productQtde = getProducts.filter(
      getProduct =>
        products.filter(
          product => product.product_id === getProduct.product_id,
        )[0].quantity > getProduct.quantity,
    );

    if (productQtde.length > 0) {
      throw new AppError('One or more products is insufficient for this order');
    }

    const formatProduct = products.map(product => ({
      product_id: product.product_id,
      quantity: product.quantity,
      price: getProducts.filter(
        getProduct => getProduct.product_id === product.product_id,
      )[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: getCustomer,
      products: formatProduct,
    });

    const setProductQtde = formatProduct.map(product => ({
      product_id: product.product_id,
      quantity:
        getProducts.filter(
          getProduct => getProduct.product_id === product.product_id,
        )[0].quantity - product.quantity,
    }));

    await this.productsRepository.updateQuantity({ products: setProductQtde });

    return order;
  }
}

export default CreateOrderService;

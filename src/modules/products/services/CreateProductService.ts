import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const getProduct = await this.productsRepository.findByName({ name });

    if (getProduct) throw new AppError('This Product already exists');

    const product = this.productsRepository.create({ name, quantity, price });

    return product;
  }
}

export default CreateProductService;

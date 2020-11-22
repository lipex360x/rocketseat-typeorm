import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository, {
  CreateProductProps,
  FindByNameProps,
  FindProductsProps,
  UpdateQuantityProps,
} from '@modules/products/repositories/IProductsRepository';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: CreateProductProps): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName({
    name,
  }: FindByNameProps): Promise<Product | undefined> {
    const getProduct = await this.ormRepository.findOne({ where: { name } });

    return getProduct;
  }

  public async findAllById({
    product_ids,
  }: FindProductsProps): Promise<Product[]> {
    const getProducts = await this.ormRepository.find({
      where: {
        product_id: In(product_ids),
      },
    });

    return getProducts;
  }

  public async updateQuantity({
    products,
  }: UpdateQuantityProps): Promise<Product[]> {
    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;

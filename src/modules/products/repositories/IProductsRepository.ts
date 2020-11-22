import Product from '../infra/typeorm/entities/Product';

export interface CreateProductProps {
  name: string;
  price: number;
  quantity: number;
}

export interface FindByNameProps {
  name: string;
}

export interface FindProductsProps {
  product_ids: string[];
}

interface ProductsUpdate {
  product_id: string;
  quantity: number;
}

export interface UpdateQuantityProps {
  products: ProductsUpdate[];
}

export default interface IProductsRepository {
  create(data: CreateProductProps): Promise<Product>;
  findByName(data: FindByNameProps): Promise<Product | undefined>;
  findAllById(data: FindProductsProps): Promise<Product[]>;
  updateQuantity(data: UpdateQuantityProps): Promise<Product[]>;
}

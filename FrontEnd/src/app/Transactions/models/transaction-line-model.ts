import { ProductModel } from './../../products/models/product-model';
export interface TransactionLineModel {
  id: number;
  productId: number;
  product: ProductModel;
  quantity: number;
  unitPrice: number;
}

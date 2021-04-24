export interface ProductModel {
  id?: number;
  name?: string | undefined;
  description?: string | undefined;
  price?: number;
  numberInStock?: number;
  massStr?: string | undefined;
  massValue?: number;
  massUnitSymbol?: string | undefined;
}

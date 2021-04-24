export interface ProductCreateModel {
  id?: number;
  name?: string | undefined;
  description?: string | undefined;
  price?: number;
  numberInStock?: number;
  massValue?: number;
  massUnitSymbol?: string | undefined;
}

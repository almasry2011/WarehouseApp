export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  search: string;
  data: T[];

}

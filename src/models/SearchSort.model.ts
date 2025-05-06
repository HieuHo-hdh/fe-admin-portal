export interface PaginationParams {
  limit: number;
  skip: number;
}

export interface SortParams {
  sortBy?: string;
  order?: 'asc' | 'desc';
}
export interface SearchParams {
  [key: string]: number | string | undefined;
}

export interface SearchSortParams extends PaginationParams, SortParams, SearchParams {}

export interface TableState extends SearchSortParams {
  current: number;
  pageSize: number;
}

import { SearchSortParams } from '@/models/SearchSort.model';

export const buildQueryString = (params: Partial<SearchSortParams>): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  return queryParams.toString();
};

export const convertTableStateToApiParams = (state: {
  current: number;
  pageSize: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  q?: string;
}): SearchSortParams => {
  return {
    limit: state.pageSize,
    skip: (state.current - 1) * state.pageSize,
    sortBy: state.sortBy,
    order: state.order,
    q: state.q,
  };
}; 
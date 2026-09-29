export type Organization = {
  id: string;
  code: string;
  name: string;
};

// TODO: must be page
export type GetOrganizationsResponse = {
  items: Organization[];
  total: number;
  pag: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type GetOrganizationsQueryParams = {
  name?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  desc?: boolean;
};

export type CreateOrganizationRequestBody = {
  code: string;
  name: string;
};

export type UpdateOrganizationRequestBody = {
  code?: string;
  name?: string;
};

import { Organization } from '../../organizations/types/api';

export type Location = {
  id: string;
  name: string;
  address: string;
  ogtsuId: string;
  orgDto: Organization;
};

export type GetLocationsResponse = {
  items: Location[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type GetLocationsQueryParams = {
  name?: string;
  address?: string;
  ogtsuId?: string;
  orgId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  desc?: boolean;
};

export type CreateLocationRequestBody = {
  address: string;
  name: string;
  ogtsuId: string;
  orgId: string;
};

export type UpdateLocationRequestBody = {
  address?: string;
  name?: string;
  ogtsuId?: string;
  orgId?: string;
};

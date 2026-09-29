import { createContext, useContext, useState, type ReactNode } from 'react';

import type { GetOrganizationsQueryParams } from '../types/api';

type OrganizationsContextValue = {
  queryParams: GetOrganizationsQueryParams;

  setName: (name?: string) => void;
  setPagination: (page: number, pageSize: number) => void;

  resetFilters: () => void;
};

const defaultQueryParams: GetOrganizationsQueryParams = {
  page: 1,
  pageSize: 20
};

export const OrganizationsContext =
  createContext<OrganizationsContextValue | null>(null);

type OrganizationsProviderProps = {
  children: ReactNode;
};

export const OrganizationsProvider = ({
  children
}: OrganizationsProviderProps) => {
  const [queryParams, setQueryParams] =
    useState<GetOrganizationsQueryParams>(defaultQueryParams);

  const setName = (name?: string) => {
    setQueryParams((prev) => ({
      ...prev,
      name,
      page: 1
    }));
  };

  const setPagination = (page: number, pageSize: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
      pageSize
    }));
  };

  const resetFilters = () => {
    setQueryParams(defaultQueryParams);
  };

  return (
    <OrganizationsContext.Provider
      value={{
        queryParams,
        setName,
        setPagination,
        resetFilters
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizations = () => {
  const context = useContext(OrganizationsContext);

  if (!context) {
    throw new Error(
      'useOrganizations must be used within OrganizationsProvider'
    );
  }

  return context;
};

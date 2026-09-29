import { createContext, useContext, useState, type ReactNode } from 'react';

import type { GetLocationsQueryParams } from '../types/api';

export type LocationFilters = Pick<
  GetLocationsQueryParams,
  'name' | 'address' | 'ogtsuId' | 'orgId'
>;

type LocationsContextValue = {
  queryParams: GetLocationsQueryParams;

  setFilters: (filters: Partial<LocationFilters>) => void;
  setPagination: (page: number, pageSize: number) => void;
  // TODO: reset filters does not work prpltly
  resetFilters: () => void;
};

const defaultQueryParams: GetLocationsQueryParams = {
  page: 1,
  pageSize: 20
};

export const LocationsContext = createContext<LocationsContextValue | null>(
  null
);

type LocationsProviderProps = {
  children: ReactNode;
};

export const LocationsProvider = ({ children }: LocationsProviderProps) => {
  const [queryParams, setQueryParams] =
    useState<GetLocationsQueryParams>(defaultQueryParams);

  const setFilters = (filters?: Partial<LocationFilters>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
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
    <LocationsContext.Provider
      value={{
        queryParams,
        setFilters,
        setPagination,
        resetFilters
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);

  if (!context) {
    throw new Error('useLocations must be used within LocationsProvider');
  }

  return context;
};

import { createContext, useState, type ReactNode } from 'react';

import type { GetPrintersQueryParams } from '../types/api';

export type PrinterFilters = Pick<
  GetPrintersQueryParams,
  | 'ipAddress'
  | 'macAddress'
  | 'model'
  | 'displayName'
  | 'serialNumber'
  | 'vendor'
  | 'ogtsuId'
  | 'orgId'
>;

type PrintersContextValue = {
  queryParams: GetPrintersQueryParams;

  setFilters: (filters: Partial<PrinterFilters>) => void;

  setPagination: (page: number, pageSize: number) => void;

  resetFilters: () => void;
};

const defaultQueryParams: GetPrintersQueryParams = {
  page: 1,
  pageSize: 20
};

export const PrintersContext = createContext<PrintersContextValue | null>(null);

type PrintersProviderProps = {
  children: ReactNode;
};

export const PrintersProvider = ({ children }: PrintersProviderProps) => {
  const [queryParams, setQueryParams] =
    useState<GetPrintersQueryParams>(defaultQueryParams);

  const setFilters = (filters: Partial<PrinterFilters>) => {
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
    <PrintersContext.Provider
      value={{
        queryParams,
        setFilters,
        setPagination,
        resetFilters
      }}
    >
      {children}
    </PrintersContext.Provider>
  );
};

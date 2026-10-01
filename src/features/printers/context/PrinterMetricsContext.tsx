import { createContext, useContext, useState, type ReactNode } from 'react';

import type { GetPrinterMetricsQueryParams } from '../types/api';

type PrinterMetricsContextValue = {
  queryParams: GetPrinterMetricsQueryParams;
  setPeriod: (from?: string, to?: string) => void;
  resetFilters: () => void;
};

const defaultQueryParams: GetPrinterMetricsQueryParams = {
  //TODO: check if this is correct
  limit: 50
};

export const PrinterMetricsContext =
  createContext<PrinterMetricsContextValue | null>(null);

type PrinterMetricsProviderProps = {
  children: ReactNode;
};

export const PrinterMetricsProvider = ({
  children
}: PrinterMetricsProviderProps) => {
  const [queryParams, setQueryParams] =
    useState<GetPrinterMetricsQueryParams>(defaultQueryParams);

  const setPeriod = (from?: string, to?: string) => {
    setQueryParams((prev) => ({
      ...prev,
      from,
      to
    }));
  };

  const resetFilters = () => {
    setQueryParams(defaultQueryParams);
  };

  return (
    <PrinterMetricsContext.Provider
      value={{
        queryParams,
        setPeriod,
        resetFilters
      }}
    >
      {children}
    </PrinterMetricsContext.Provider>
  );
};

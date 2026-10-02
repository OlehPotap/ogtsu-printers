import { createContext, useState, type ReactNode } from 'react';

import type { GetPrinterMetricsQueryParams } from '../types/api';

import dayjs from 'dayjs';

type PrinterMetricsContextValue = {
  queryParams: GetPrinterMetricsQueryParams;

  interval: MetricsInterval;

  setPeriod: (from?: string, to?: string) => void;
  setInterval: (interval: MetricsInterval) => void;

  resetFilters: () => void;
};

export type MetricsInterval = 'raw' | 'hour' | 'day' | 'week' | 'month';

const getDefaultQueryParams = (): GetPrinterMetricsQueryParams => ({
  from: dayjs().subtract(6, 'day').startOf('day').toISOString(),

  to: dayjs().endOf('day').toISOString(),

  limit: 500
});

export const PrinterMetricsContext =
  createContext<PrinterMetricsContextValue | null>(null);

type PrinterMetricsProviderProps = {
  children: ReactNode;
};

export const PrinterMetricsProvider = ({
  children
}: PrinterMetricsProviderProps) => {
  const [queryParams, setQueryParams] = useState<GetPrinterMetricsQueryParams>(
    getDefaultQueryParams
  );

  const [interval, setInterval] = useState<MetricsInterval>('raw');

  const setPeriod = (from?: string, to?: string) => {
    setQueryParams((prev) => ({
      ...prev,
      from,
      to
    }));
  };

  const resetFilters = () => {
    setQueryParams(getDefaultQueryParams);
  };

  return (
    <PrinterMetricsContext.Provider
      value={{
        queryParams,
        interval,
        setInterval,
        setPeriod,
        resetFilters
      }}
    >
      {children}
    </PrinterMetricsContext.Provider>
  );
};

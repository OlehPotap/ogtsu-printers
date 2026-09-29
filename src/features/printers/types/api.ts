export type Printer = {
  id: string;
  ipAddress: string;
  model: string;
  displayName: string;
  vendor: string;
  orgId: string;
  locationId: string;
  lastStatus: string;
};

export type GetPrintersResponse = {
  items: Printer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type GetPrintersQueryParams = {
  ipAddress?: string;
  macAddress?: string;
  model?: string;
  displayName?: string;
  serialNumber?: string;
  vendor?: string;
  ogtsuId?: string;
  orgId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  desc?: boolean;
};

export type CreatePrinterRequestBody = {
  community: string | null;
  displayName: string;
  ipAddress: string;
  locationId: string;
  macAddress: string;
  model: string;
  orgId: string;
  profileId: string;
  serialNumber: string;
  snmpPort: number | null;
  snmpVersion: string | null;
  vendor: string;
};

export type UpdatePrinterRequestBody = {
  community?: string | null;
  displayName?: string;
  id: string;
  ipAddress?: string;
  locationId?: string;
  orgId?: string;
  profileId?: string;
  snmpPort?: number;
  snmpVersion?: string;
  vendor?: string;
};

export type PrinterSupply = {
  type: number;
  color: number;
  description: string;
  levelPercent: number | null;
  rawLevel: number;
  maxCapacity: number;
  unit: string;
};

export type PrinterMetric = {
  printerId: string;
  status: number;
  timestamp: string;
  uptimeSeconds: number | null;
  totalImpressions: number | null;
  monoImpressions: number | null;
  colorImpressions: number | null;
  supplies: PrinterSupply[];
};

export type GetPrinterMetricsResponse = {
  items: PrinterMetric[];
  nextBefore: string | null;
};

export type GetPrinterMetricsQueryParams = {
  from?: string;
  to?: string;
  before?: string;
  status?: number;
  supplyBelow?: number;
  supplyType?: number;
  limit: number;
};

export type DiscoverPrinterResponse = {
  ipAddress: string;
  displayName: string;
  model: string;
  serialNumber: string;
  sysObjectId: string;
  rawData: Record<string, unknown>;
};

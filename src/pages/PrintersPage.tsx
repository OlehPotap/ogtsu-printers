import { Alert, Spin, Button, Space } from 'antd';

import { useGetPrintersQuery } from '../features/printers/api/printersApi';
import PrintersTable from '../features/printers/components/PrintersTable';
import { usePrinters } from '../features/printers/hooks/usePrinters';
import { openExport } from '../shared/utils/openExport';

const PrintersPage = () => {
  const { queryParams, setPagination } = usePrinters();

  const { data, isLoading, isFetching, isError } =
    useGetPrintersQuery(queryParams);

  const handlePrintersExport = () => {
    openExport('/printers/export', {
      IpAddress: queryParams.ipAddress,
      Model: queryParams.model,
      DisplayName: queryParams.displayName,
      SerialNumber: queryParams.serialNumber,
      Vendor: queryParams.vendor,
      OrgId: queryParams.orgId,

      Page: queryParams.page,
      PageSize: queryParams.pageSize,
      SortBy: queryParams.sortBy,
      Desc: queryParams.desc,

      format: 'csv'
    });
  };

  const handleLastMetricsExport = () => {
    openExport('/printers/export/last-metrics', {
      OrgId: queryParams.orgId,
      Vendor: queryParams.vendor,

      format: 'csv'
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Alert type='error' message='Не удалось загрузить принтеры' />;
  }

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handlePrintersExport}>Експорт принтерів</Button>

        <Button onClick={handleLastMetricsExport}>
          Експорт останніх метрик
        </Button>
      </Space>
      <PrintersTable
        printers={data?.items ?? []}
        loading={isLoading || isFetching}
        pagination={{
          current: queryParams.page ?? 1,
          pageSize: queryParams.pageSize ?? 20,
          total: data?.total ?? 0
        }}
        onPaginationChange={setPagination}
      />
    </>
  );
};

export default PrintersPage;

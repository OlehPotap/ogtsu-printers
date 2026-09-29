import { Alert, Spin } from 'antd';

import { useGetOrganizationsQuery } from '../features/organizations/api/organizationsApi';
import OrganizationsTable from '../features/organizations/components/OrganizationsTable';
import { useOrganizations } from '../features/organizations/hooks/useOrganizations';

const OrganizationsPage = () => {
  const { queryParams, setPagination } = useOrganizations();

  const { data, isLoading, isFetching, isError } =
    useGetOrganizationsQuery(queryParams);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Alert type='error' message='Не вдалось завантажити організації' />;
  }

  if (!data) {
    return <Alert type='error' message='Не вдалось завантажити організації' />;
  }
  return (
    <OrganizationsTable
      organizations={data?.items ?? []}
      loading={isLoading || isFetching}
      pagination={{
        current: queryParams.page ?? 1,
        pageSize: queryParams.pageSize ?? 20,
        total: data?.total ?? 0
      }}
      onPaginationChange={setPagination}
    />
  );
};

export default OrganizationsPage;

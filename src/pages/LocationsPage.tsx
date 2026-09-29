import { Alert, Spin } from 'antd';

import { useGetLocationsQuery } from '../features/locations/api/locationsApi';
import LocationsTable from '../features/locations/components/LocationsTable';
import { useLocations } from '../features/locations/hooks/useLocations';

const LocationsPage = () => {
  const { queryParams, setPagination } = useLocations();

  const { data, isLoading, isFetching, isError } =
    useGetLocationsQuery(queryParams);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Alert type='error' message='Не вдалось завантажити локації' />;
  }

  if (!data) {
    return <Alert type='error' message='Не вдалось завантажити локації' />;
  }

  return (
    <LocationsTable
      locations={data?.items ?? []}
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

export default LocationsPage;

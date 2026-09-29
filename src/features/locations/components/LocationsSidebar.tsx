import { Button, Input, Select, Space } from 'antd';
import type { SelectProps } from 'antd';

import type { LocationFilters } from '../context/LocationsContext';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';
import { useGetLocationsQuery } from '../api/locationsApi';

type LocationsSidebarProps = {
  setFilters: (filters: Partial<LocationFilters>) => void;
  resetFilters: () => void;
};

const LocationsSidebar = ({
  setFilters,
  resetFilters
}: LocationsSidebarProps) => {
  const { data: organizationsData, isLoading: isOrganizationsLoading } =
    useGetOrganizationsQuery({
      page: 1,
      pageSize: 100
    });

  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery({
      page: 1,
      pageSize: 100
    });

  const organizationOptions: SelectProps<string>['options'] =
    organizationsData?.items.map((organization) => ({
      label: `${organization.code} — ${organization.name}`,
      value: organization.id
    })) ?? [];

  const locationCodes = [
    ...new Set(
      locationsData?.items
        .map((location) => location.ogtsuId)
        .filter((code): code is string => Boolean(code))
    )
  ];

  const locationCodeOptions: SelectProps<string>['options'] = locationCodes.map(
    (code) => ({
      label: code,
      value: code
    })
  );

  return (
    <aside
      style={{
        width: 280,
        padding: 16,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Input.Search
          placeholder='Пошук за назвою'
          allowClear
          onSearch={(value) => {
            setFilters({
              name: value || undefined
            });
          }}
        />

        <Input.Search
          placeholder='Пошук за адресою'
          allowClear
          onSearch={(value) => {
            setFilters({
              address: value || undefined
            });
          }}
        />

        <Select<string>
          placeholder='Код локації'
          allowClear
          showSearch={{
            optionFilterProp: 'label'
          }}
          loading={isLocationsLoading}
          style={{ width: '100%' }}
          options={locationCodeOptions}
          onChange={(value) => {
            setFilters({
              ogtsuId: value
            });
          }}
        />

        <Select<string>
          placeholder='Організація'
          allowClear
          showSearch={{
            optionFilterProp: 'label'
          }}
          loading={isOrganizationsLoading}
          style={{ width: '100%' }}
          options={organizationOptions}
          onChange={(value) => {
            setFilters({
              orgId: value
            });
          }}
        />

        <Button onClick={resetFilters} block>
          Скинути фільтри
        </Button>
      </Space>
    </aside>
  );
};

export default LocationsSidebar;

import { useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';
import type { SelectProps } from 'antd';

import type { LocationFilters } from '../context/LocationsContext';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';
import { useGetLocationsQuery } from '../api/locationsApi';

type SearchType = 'name' | 'address';

const { Text } = Typography;

type LocationsSidebarProps = {
  setFilters: (filters: Partial<LocationFilters>) => void;
  resetFilters: () => void;
};

const LocationsSidebar = ({
  setFilters,
  resetFilters
}: LocationsSidebarProps) => {
  const [searchType, setSearchType] = useState<SearchType>('name');
  const [search, setSearch] = useState('');

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

  const handleSearchTypeChange = (value: SearchType) => {
    setSearchType(value);
    setSearch('');

    setFilters({
      name: undefined,
      address: undefined
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);

    setFilters({
      name: searchType === 'name' ? value || undefined : undefined,

      address: searchType === 'address' ? value || undefined : undefined
    });
  };

  return (
    <aside
      style={{
        width: 280,
        padding: 16,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <div>
          <Text strong>Пошук</Text>

          <Space
            direction='vertical'
            style={{
              width: '100%',
              marginTop: 8
            }}
          >
            <Select<SearchType>
              value={searchType}
              style={{ width: '100%' }}
              onChange={handleSearchTypeChange}
              options={[
                {
                  label: 'Пошук за назвою',
                  value: 'name'
                },
                {
                  label: 'Пошук за адресою',
                  value: 'address'
                }
              ]}
            />

            <Input.Search
              value={search}
              allowClear
              placeholder={searchType === 'name' ? 'Назва' : 'Адреса'}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onSearch={handleSearch}
            />
          </Space>
        </div>

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

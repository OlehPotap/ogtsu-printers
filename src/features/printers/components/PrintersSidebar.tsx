import { useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';

import AddPrinterModal from '../components/AddPrinterModal';

import type { PrinterFilters } from '../context/PrintersContext';

import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';
import { useGetLocationsQuery } from '../../locations/api/locationsApi';

type PrintersSidebarProps = {
  setFilters: (filters: Partial<PrinterFilters>) => void;
  resetFilters: () => void;
};

type SearchType = 'name' | 'ip' | 'serial';

const { Text } = Typography;

const PrintersSidebar = ({
  setFilters,
  resetFilters
}: PrintersSidebarProps) => {
  const [isAddPrinterOpen, setIsAddPrinterOpen] = useState(false);

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

  const organizationOptions =
    organizationsData?.items.map((organization) => ({
      label: `${organization.code} — ${organization.name}`,
      value: organization.id
    })) ?? [];

  const locationOptions =
    locationsData?.items.map((location) => ({
      label: `${location.ogtsuId} — ${location.name}`,
      value: location.ogtsuId
    })) ?? [];

  const handleSearch = (value: string) => {
    setSearch(value);

    setFilters({
      displayName: searchType === 'name' ? value || undefined : undefined,

      ipAddress: searchType === 'ip' ? value || undefined : undefined,

      serialNumber: searchType === 'serial' ? value || undefined : undefined
    });
  };

  const handleSearchTypeChange = (value: SearchType) => {
    setSearchType(value);
    setSearch('');

    setFilters({
      displayName: undefined,
      ipAddress: undefined,
      serialNumber: undefined
    });
  };

  const handleReset = () => {
    setSearch('');
    setSearchType('name');
    resetFilters();
  };

  return (
    <aside
      style={{
        width: 280,
        padding: 16,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <Button
          type='primary'
          block
          onClick={() => {
            setIsAddPrinterOpen(true);
          }}
        >
          Додати принтер
        </Button>

        <AddPrinterModal
          open={isAddPrinterOpen}
          onClose={() => {
            setIsAddPrinterOpen(false);
          }}
        />

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
                  label: "Пошук за ім'ям",
                  value: 'name'
                },
                {
                  label: 'Пошук за IP адресою',
                  value: 'ip'
                },
                {
                  label: 'Пошук за серійним номером',
                  value: 'serial'
                }
              ]}
            />

            <Input.Search
              value={search}
              allowClear
              placeholder={
                searchType === 'name'
                  ? "Ім'я"
                  : searchType === 'ip'
                    ? 'IP адреса'
                    : 'Серійний номер'
              }
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onSearch={handleSearch}
            />
          </Space>
        </div>

        <div>
          <Text strong>Model</Text>

          <Select<string>
            placeholder='Оберіть модель'
            allowClear
            showSearch
            style={{
              width: '100%',
              marginTop: 8
            }}
            onChange={(value) => {
              setFilters({
                model: value
              });
            }}
          />
        </div>

        <div>
          <Text strong>Vendor</Text>

          <Select<string>
            placeholder='Оберіть виробника'
            allowClear
            showSearch
            style={{
              width: '100%',
              marginTop: 8
            }}
            onChange={(value) => {
              setFilters({
                vendor: value
              });
            }}
          />
        </div>

        <div>
          <Text strong>Location</Text>

          <Select<string>
            placeholder='Оберіть локацію'
            allowClear
            showSearch={{
              optionFilterProp: 'label'
            }}
            loading={isLocationsLoading}
            options={locationOptions}
            style={{
              width: '100%',
              marginTop: 8
            }}
            onChange={(value) => {
              setFilters({
                ogtsuId: value
              });
            }}
          />
        </div>

        <div>
          <Text strong>Organization</Text>

          <Select<string>
            placeholder='Оберіть організацію'
            allowClear
            showSearch={{
              optionFilterProp: 'label'
            }}
            loading={isOrganizationsLoading}
            options={organizationOptions}
            style={{
              width: '100%',
              marginTop: 8
            }}
            onChange={(value) => {
              setFilters({
                orgId: value
              });
            }}
          />
        </div>

        <Button block onClick={handleReset}>
          Скинути фільтри
        </Button>
      </Space>
    </aside>
  );
};

export default PrintersSidebar;

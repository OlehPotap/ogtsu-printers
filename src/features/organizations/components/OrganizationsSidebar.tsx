import { Input, Button } from 'antd';

type OrganizationsSidebarProps = {
  setName: (name?: string) => void;
  resetFilters: () => void;
};

const OrganizationsSidebar = ({
  setName,
  resetFilters
}: OrganizationsSidebarProps) => {
  return (
    <aside
      style={{
        width: 280,
        padding: 16,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Input.Search
        placeholder='Поиск по названию'
        allowClear
        onSearch={(value) => {
          setName(value || undefined);
        }}
      />

      <Button onClick={resetFilters}>Сбросить фильтры</Button>
    </aside>
  );
};

export default OrganizationsSidebar;

import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '../../app/routes/routes';

const items: MenuProps['items'] = [
  {
    key: routes.printers,
    label: 'Принтери'
  },
  {
    key: routes.analytics,
    label: 'Аналітика'
  },
  {
    key: 'admin',
    label: 'Адміністрування',
    children: [
      {
        key: routes.adminOrganizations,
        label: 'Організації'
      },
      {
        key: routes.adminLocations,
        label: 'Локації'
      },
      {
        key: routes.adminUsers,
        label: 'Користувачі'
      }
    ]
  }
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[pathname]}
      mode='horizontal'
      items={items}
    />
  );
};

export default Header;

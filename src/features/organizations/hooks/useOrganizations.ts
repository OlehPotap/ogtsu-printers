import { useContext } from 'react';

import { OrganizationsContext } from '../context/OrganizationsContext';

export const useOrganizations = () => {
  const context = useContext(OrganizationsContext);

  if (!context) {
    throw new Error(
      'useOrganizations must be used within OrganizationsProvider'
    );
  }

  return context;
};

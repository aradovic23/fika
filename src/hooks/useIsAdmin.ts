import { useOrganizationList } from '@clerk/nextjs';

export const useIsAdmin = () => {
  const { organizationList } = useOrganizationList();
  const isAdmin = organizationList?.some(org => org.membership.role === 'admin');
  return isAdmin;
};

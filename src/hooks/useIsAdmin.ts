import { useSession } from 'next-auth/react';

export function useIsAdmin() {
  const { data: sessionData } = useSession();

  return sessionData?.user?.role === 'ADMIN';
}

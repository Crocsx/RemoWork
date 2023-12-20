import { useAuthState } from 'react-firebase-hooks/auth';

import { getAuth } from 'firebase/auth';

export const AuthRestricted = ({
  children,
}: {
  children: React.ReactNode | ((isAuthenticated: boolean) => React.ReactNode);
}) => {
  const [user] = useAuthState(getAuth());

  if (typeof children === 'function') {
    return <>{children(!!user)}</>;
  }

  if (!user) {
    return null;
  }

  return children;
};

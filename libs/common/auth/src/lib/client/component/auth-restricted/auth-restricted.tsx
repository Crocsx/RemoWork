import { useAuthCtx } from '../../context';
import { AuthContextType } from '../../context/auth/auth-context';

export const AuthRestricted = ({
  children,
}: {
  children:
    | React.ReactNode
    | ((isAuthenticated: AuthContextType) => React.ReactNode);
}) => {
  const { self, verified, authenticated } = useAuthCtx();

  if (typeof children === 'function') {
    return <>{children({ self, verified, authenticated })}</>;
  }

  if (!authenticated || !verified) {
    return null;
  }

  return children;
};

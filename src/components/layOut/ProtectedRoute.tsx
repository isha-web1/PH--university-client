import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

type JwtPayloadWithRole = {
  role?: string;
  [key: string]: any;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user: JwtPayloadWithRole | undefined;

  if (token) {
    user = verifyToken(token) as JwtPayloadWithRole;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
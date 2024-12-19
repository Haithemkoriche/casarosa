// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'; // Keep it as default import
import { useMemo } from 'react';

const useJwtWrapper = () => {
  const jwt = useJwt({}); // Use the default useJwt
  return jwt;
};

export default useJwtWrapper;

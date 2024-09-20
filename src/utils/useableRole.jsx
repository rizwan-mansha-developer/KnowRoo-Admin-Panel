import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useRole = () => {
  const [role, setRole] = useState(1);

  useEffect(() => {
    const roleFromCookie = Cookies.get('role_id');
    setRole(roleFromCookie ? parseInt(roleFromCookie, 10) : null);
  }, []);

  return role;
};

export default useRole;

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = () => {
      const role_id = Cookies.get('role_id');
      setRole(role_id);
    };

    fetchRole();

    // You can add event listeners or subscriptions here if the role_id might change during the app's lifecycle.
    // For example, you could listen for cookie changes or user login/logout events.
  }, []);

  return role;
};

export default useRole;

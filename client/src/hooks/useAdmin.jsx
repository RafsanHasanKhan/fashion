// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from 'react-query';

// const useAdmin = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//     queryKey: [user?.email, 'isAdmin'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`users/admin/${user?.email}`);
//       console.log(res.data);
//       return res.data?.admin;
//     }
    
//   });

//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;

// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from 'react-query';

// const useAdmin = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
//     [user?.email, 'isAdmin'], // Query key
//     async () => {
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//       console.log(res.data);
//       return res.data?.admin; // Return admin status
//     },
//     {
//       enabled: !!user?.email, // Only run query if user email exists
//     }
//   );

//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/admin/${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
    enabled: !!user?.email, // Only run query if user email exists
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;

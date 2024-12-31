import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCarts = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: cart=[], refetch} = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async() => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    }
  })
  return [cart, refetch]
};

export default useCarts;


import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = () => {
  const axiosPublic = useAxiosPublic();

  const { data: product = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
    const res = await axiosPublic.get('/products')
    console.log(res.data)
    return res.data
    }
  });
  return [product, loading, refetch];
};

export default useProduct;
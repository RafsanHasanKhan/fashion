import { useForm } from 'react-hook-form';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const AddMenu = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // image hosting key
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;




  const imageHostingApi = `https://api.imgbb.com/1/upload?&key=${imageHostingKey}`;
  const onSubmit = async data => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    console.log(hostingImg);

    if (hostingImg.data.success) {
      const productItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
        description: data.description,
      };

      const postProductItem = axiosSecure.post('/products', productItem);
      if (postProductItem) {
        reset()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Item is inserted successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green-500">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Choose Category*</span>
              </label>
              <select
                {...register('category')}
                className="select select-bordered"
                defaultValue=" default"
              >
                <option disabled value="default">
                  Select A Category
                </option>
                <option value="men">Men</option>
                <option value="woman">Woman</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register('price')}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Details</span>
            </label>
            <textarea
              {...register('description')}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the words about your product"
            ></textarea>
          </div>
          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register('image')}
              type="file"
              className="file-input w-full"
            />
          </div>
          <button className="btn bg-green-500 text-white">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;

import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const UpdateUserProfile = () => {
  const { userUpdateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    const { name, photoURL } = data;
    try {
      await userUpdateProfile(name, photoURL);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile information has been updated successfully.',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating your profile. Please try again.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div>
      <Link to="/" className="flex justify-end p-4">
        <IoMdClose className="text-4xl btn-ghost" />
      </Link>
      <div className="section-container ">
        <div className="flex justify-center items-center my-32">
          <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl">
            <div className=" mt-8">
              <h2 className="text-2xl text-center">Update Profile</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body mb-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  {...register('name', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photoURL"
                  className="input input-bordered"
                  required
                  {...register('photoURL', { required: true })}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gray-300">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;

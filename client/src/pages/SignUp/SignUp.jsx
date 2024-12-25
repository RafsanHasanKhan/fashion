import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, userUpdateProfile } = useAuth();

  const onSubmit = async data => {
    const { name, photoURL, email, password } = data;

    try {
      const res = await createUser(email, password);
      await userUpdateProfile(name, photoURL);
      console.log('User created:', res); // Access the user object here
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Signup Successful',
        text: 'Your account has been created successfully.',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error creating user:', error);
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
            <div className="ml-8 mt-8">
              <h2 className="text-2xl">Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register('email', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  {...register('password', { required: true })}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gray-300">Sign Up</button>
              </div>
              <div className="mt-4 ml-1">
                <p>
                  Already have an account?{' '}
                  <Link to="/signup" className="btn-ghost">
                    Log in here
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const onSubmit = async data => {
    const { email, password } = data;
    try {
      const res = await loginUser(email, password);
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged into your account.',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
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
              <h2 className="text-2xl">Log In</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                <button className="btn bg-gray-300">Login</button>
              </div>
              <div className="mt-4 ml-1">
                <p>
                  Don’t have an account?{' '}
                  <Link to="/signup" className="btn-ghost">
                    Create one now
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

export default Login;

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCarts from '../../../hooks/useCarts';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCarts();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [cartItems, setCartItems]=useState([])
  // calculate price
  const calculatePrice = item => item.price * item.quantity;

  const cartSubTotal = cart.reduce((total, item) => total + calculatePrice(item), 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleDelete = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red color for "Delete" button
      cancelButtonColor: '#3085d6', // Blue color for "Cancel" button
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`carts/${item._id}`)
          .then(res => {
            console.log(res);
            refetch();
            // Simulate product deletion process
            setTimeout(() => {
              Swal.fire({
                title: 'Deleted!',
                text: 'The product has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
              });
            }, 500); // Simulating some delay (like an API call)
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const handleIncrease = (item) => {
    // Make sure to send the updated quantity to the backend
    const newQuantity = item.quantity + 1;
  
    // Send the updated quantity using PATCH
    axiosSecure.patch(`/carts/${item._id}`, { quantity: newQuantity })
      .then(res => {

        refetch(); // Refresh the cart data
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to increase quantity. Please try again.',
          icon: 'error',
          position: 'top-end', // Show alert on the right side
          showConfirmButton: false, // Disable the OK button
          timer: 2000, // The alert will automatically close after 2 seconds
          timerProgressBar: true, // Show the progress bar
          confirmButtonColor: '#d33',
        });
      });
  };
  
  
  const handleDecrease = (item) => {
    const newQuantity = item.quantity - 1;
  
    if (item.quantity > 1) {
      axiosSecure.patch(`/carts/${item._id}`, { quantity: newQuantity })
        .then(res => {

          refetch();
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update quantity. Please try again.',
            icon: 'error',
            position: 'top-end', // Show alert on the right side
            showConfirmButton: false, // Disable the OK button
            timer: 2000, // Automatically close the alert after 2 seconds
            timerProgressBar: true, // Show the progress bar
            confirmButtonColor: '#d33',
          });
        });
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Quantity cannot be less than 1.',
        icon: 'warning',
        confirmButtonColor: '#f39c12',
      });
    }
  };
  
  
  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="pt-32 pb-20 flex flex-col justify-center items-center gap-8">
          {/* text content */}
          <div className=" space-y-7 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              Items Added To The <span className="text-green-500">Product</span>
            </h2>
          </div>
        </div>
      </div>
      {
        cart.length ? <>
        <div className="overflow-x-auto my-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr className="shadow-lg " key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  <button onClick={()=>handleDecrease(item)} className="btn btn-sm">-</button>
                  <input
                    type="text"
                    value={item.quantity}
                    
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button onClick={()=>handleIncrease(item)} className="btn btn-sm">+</button>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    ${item.price}
                  </button>
                </th>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost text-xl text-red-500"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </> : <div className='text-center my-12'><Link to='/products' className='btn  bg-green-500 text-white'>Go Back</Link></div>
      }
      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user.displayName || 'null'}</p>
          <p>Email: {user.email}</p>
          <p>User_id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <div className="md:w-1/2 space-y-3">
            <h3 className="font-medium">Shopping Details</h3>
            <p>Total Items: {cart.length}</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${cartSubTotal.toFixed(2)}</p>
            {/* <p>Total Quantity: </p> */}
            <button className="btn bg-green-500 uppercase text-white">
              proceed checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

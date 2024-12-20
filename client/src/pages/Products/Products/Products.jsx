import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('products.json');
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    return fetchData;
  }, []);
  console.log(products);
  return (
    <section className="section-container px-4 lg:px-0 py-32">
    {/* <div className="section-container px-4 lg:px-0"> */}
    <div className="py-20 flex flex-col justify-center items-center gap-8">
        {/* text content */}
        <div className=" space-y-7 px-4 text-center">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            Dive into Delights Of Delectable{' '}
            <span className="text-green">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="btn bg-green px-8 py-3 font-semibold hover:text-red rounded-full bg-gradient-to-b from-[#A4BC46] from-[0%] to-[#85A019] to-[100%] text-white">
            Order Now
          </button>
        </div>
        </div>
        {/* </div> */}
      <div className="my-24">
        <h2 className="mb-10 bebas-neue-regular text-5xl">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8">
          {products.map((product, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-gradient-to-b from-[#A4BC46] from-[0%] to-[#85A019] to-[100%] text-white">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

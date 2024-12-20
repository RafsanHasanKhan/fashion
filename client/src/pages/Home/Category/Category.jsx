import { useEffect, useState } from 'react';

const Category = () => {
  const [manProducts, setMenProducts] = useState([]);
  const [womanProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('products.json');
        const result = await response.json();
        const menProducts = result.filter(
          product => product.category === 'men'
        );
        const womenProducts = result.filter(
          product => product.category === 'women'
        );
        setMenProducts(menProducts);
        setWomenProducts(womenProducts);
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    };

    fetchData(); // Call the function directly here
  }, []);
  return (
    <section className="section-container px-4 lg:px-0">
      <div className='my-24'>
        <h2 className='mb-10 bebas-neue-regular text-5xl'>W0Man Jacket</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8">
          {womanProducts.slice(0, 3).map((product, index) => (
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
      <div className='my-24'>
        <h2 className='mb-10 bebas-neue-regular text-5xl'>Man Jacket</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8">
          {manProducts.slice(0, 3).map((product, index) => (
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

export default Category;

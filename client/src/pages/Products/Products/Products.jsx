import { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('products.json');
        const result = await response.json();
        setProducts(result);
        setFilteredItems(result);
      } catch (error) {
        console.log(error);
      }
    };
    return fetchData;
  }, []);

  // filter based category
  const filterItems = category => {
    const filtered =
      category === 'all'
        ? products
        : products.filter(item => item.category === category);
    setFilteredItems(filtered);
  };
  const showAll = () => {
    setFilteredItems(products);
  };

  // Search & Suggestions
  useEffect(() => {
    if (searchQuery === '') {
      setSuggestions([]);
      setFilteredItems(products);
    } else {
      const matchingSuggestions = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      setSuggestions(matchingSuggestions.slice(0, 5));
      setFilteredItems(matchingSuggestions);
    }
  }, [products, searchQuery]);

  // Sorting
  const handleSortChange = option => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    // logic
    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'low-to-high':
        sortedItems.sort(
          (a, b) =>
            parseFloat(a.price.replace('$', '')) -
            parseFloat(b.price.replace('$', ''))
        );
        break;
      case 'high-to-low':
        sortedItems.sort(
          (a, b) =>
            parseFloat(b.price.replace('$', '')) -
            parseFloat(a.price.replace('$', ''))
        );
        break;
      default: ;
        break;
    }
    setFilteredItems(sortedItems);
  };

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
        <div className="relative flex justify-between items-start">
          <h2 className="bebas-neue-regular text-5xl">All Products</h2>
          <input
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search here"
            className="input input-bordered input-ghost w-full max-w-xs"
          />
          {suggestions.length > 0 && (
            <ul className="absolute right-0 top-14 w-[319px] bg-white border border-gray-300  rounded shadow-md z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => suggestion.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* category & filter */}
        <div className="flex justify-between items-center mt-10 mb-4">
          {/* all category */}
          <div className="space-x-1 font-medium">
            <button onClick={showAll} className="rounded px-2 py-1 btn-ghost">
              All
            </button>
            <button
              onClick={() => filterItems('men')}
              className="rounded px-2 py-1 btn-ghost"
            >
              Men
            </button>
            <button
              onClick={() => filterItems('women')}
              className="rounded px-2 py-1 btn-ghost"
            >
              Woman
            </button>
          </div>
          {/* filter */}
          <div className='flex justify-center items-center gap-1'>
          <FaFilter className=' bg-black text-white p-2 rounded text-[37px]'></FaFilter>
            <select
              
              onChange={e => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-2 rounded cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Price: Low To High</option>
              <option value="high-to-low">Price: High To Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8">
          {filteredItems.map((product, index) => (
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
                <span>{product.price}</span>
                <div className="card-actions justify-end">
                  <button className="btn bg-gradient-to-b from-[#A4BC46] from-[0%] to-[#85A019] to-[100%] text-white">
                    Add To Cart
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

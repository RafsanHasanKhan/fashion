import bannerImage from '../../../../public/images/banner-image.png';
const Banner = () => {
  return (
    <div className="section-container px-4 xl:p-0 py-10 ">
      <div className="flex flex-col-reverse gap-12 md:gap-0 md:flex-row justify-between items-center">
        <div className='w-full md:w-1/2 text-center md:text-left'>
          <h2 className='text-4xl sm:text-5xl lg:text-[80px] lg:leading-[100px] bebas-neue-regular'>
            <span className='text-[#FABE4C] '>Be the Penguins</span> <br />
            <span className=''>of Winter</span>
          </h2>
          <p className='text-[#3E3E3E] max-w-[357px] mx-auto md:mx-0 mb-4'>Lorem Ipsum is simply dummy text of the printing 
          and typesetting industry.</p>
          <button className='btn bg-gradient-to-b from-[#A4BC46] from-[0%] to-[#85A019] to-[100%] text-white'>BUY NOW</button>
        </div>
        <div className='w-1/2'>
          <img src={bannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

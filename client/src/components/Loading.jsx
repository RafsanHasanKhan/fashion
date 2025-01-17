const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen section-container">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-8 w-28"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;

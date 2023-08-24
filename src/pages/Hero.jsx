import Books from "./Books";

const Hero = () => {
  return (
    <div className="max-w-[1640px] mx-auto p-4">
      <div className="max-h-[500px] relative">
        {/* Overlay */}
        <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
          <h1 className="px-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Elevating <span className="text-orange-500">Minds</span> Beyond Knowledge, Into{" "}
            <span className="text-orange-500">Harmonious</span> Existence
          </h1>
        </div>
        <img
          className="w-full max-h-[500px] object-cover"
          src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="/"
        />
      </div>
      <Books/>
    </div>
  );
};

export default Hero;

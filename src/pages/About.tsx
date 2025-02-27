const About = () => {
  return (
    <div className="bg-[#0A111D]    ">
      <div className="w-11/12 max-w-maxContent mx-auto py-12 ">
        <div className="">
          {/* Hero Section */}
          <div
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center px-6 rounded-lg shadow-lg bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

            {/* Text Content */}
            <div className="relative z-10 text-white">
              <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                Welcome to StoryNest
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                Your ultimate destination for discovering, exploring, and
                purchasing books that inspire and transform.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <h2 className="text-5xl text-gray-100 font-bold mb-4 ">
            Our Mission
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-sm ">
            At StoryNest, we believe in the power of books to educate,
            entertain, and empower. Our mission is to make quality books
            accessible to everyone while fostering a strong reading culture.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-950 text-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
            <p className="text-gray-300">
              We offer a vast collection of books across different genres, from
              fiction to academic texts.
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-gray-100 font-bold mb-2">
              Affordable Prices
            </h3>
            <p className="text-gray-200">
              We strive to provide books at competitive prices with frequent
              discounts and deals.
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-100 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-200">
              Enjoy quick and reliable delivery, ensuring you get your books in
              no time.
            </p>
          </div>
        </div>

        {/* Team Section (Optional) */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-100">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1584940120743-8981ca35b012?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded-full mx-auto h-32 w-32 object-cover"
                alt="Founder"
              />
              <h3 className="text-lg font-bold text-gray-100 mt-4">John Doe</h3>
              <p className="text-gray-200">Founder & CEO</p>
            </div>
            <div className="p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded-full mx-auto h-32 w-32 object-cover"
                alt="Manager"
              />
              <h3 className="text-lg font-bold text-gray-100  mt-4">
                Sarah Johnson
              </h3>
              <p className="text-gray-200">Operations Manager</p>
            </div>
            <div className="p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1584940121730-93ffb8aa88b0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded-full mx-auto h-32 w-32 object-cover"
                alt="Marketing Head"
              />
              <h3 className="text-lg font-bold text-gray-100  mt-4">
                Michael Lee
              </h3>
              <p className="text-gray-200">Marketing Head</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

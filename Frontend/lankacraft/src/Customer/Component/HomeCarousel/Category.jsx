import { memo } from 'react';

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Brassware",
      image: "https://www.lakpura.com/images/LK94008520-01-E.JPG",
      description: "Traditional brass artifacts and decorative items"
    },
    {
      id: 2,
      name: "Wooden Masks",
      image: "https://fortuneceylon.com/wp-content/uploads/2020/11/mask-1.jpg",
      description: "Authentic Sri Lankan carved wooden masks"
    },
    {
      id: 3,
      name: "Artisan at Work",
      image: "https://cdn.kimkim.com/files/a/images/5ab229f04021f8104b3e6267775c16cee40fbe2d/original-b0f34df65eb0dfd7c2527acf40d96d94.jpg",
      description: "Meet our skilled craftspeople in action"
    },
    {
      id: 4,
      name: "Souvenirs",
      image: "https://www.srilankaclassytours.com/medias/activity/big/172/1.jpg",
      description: "Perfect gifts and keepsakes from Sri Lanka"
    }
  ];

  return (
    <div className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" style={{ backgroundColor: 'rgb(245, 240, 235)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-7">
            Categories
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: 'rgb(238,113,89)' }}></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* Card Container */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                {/* Image Container */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div 
                  className="h-1 w-0 group-hover:w-full transition-all duration-500 mx-auto"
                  style={{ backgroundColor: 'rgb(238,113,89)' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-10 md:mt-12">
          {/* <button 
            className="text-white font-semibold py-3 px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: 'rgb(238,113,89)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(220,100,75)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(238,113,89)'}
          >
            View All Categories
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default memo(Category);
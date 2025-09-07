import { memo } from "react";

const Section2 = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
          HOW IT WORKS
        </h2>
          <div className="mb-5 w-20 h-1 mx-auto" style={{ backgroundColor: 'rgb(238,113,89)' }}></div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              APPLY TO BE A VENDOR
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Just click on the APPLY NOW button above and you will be taken to
              an online register form. After you have submitted the requested
              details a team member from <span className="font-semibold">Lanka Craft </span> 
               will contact you to guide you through the rest of the registration process.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              UPLOAD YOUR PRODUCTS
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Once successfully registered you can start uploading your products
              to <span className="font-semibold">Lanka Craft</span>. You can upload product details and
              images to the online form provided.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              SELL AND MAKE MONEY
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              You are now a proud vendor with <span className="font-semibold">Lanka Craft</span>. 
              You now have a digital platform to showcase your skills, sell your
              handcrafted products and make money.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Section2);

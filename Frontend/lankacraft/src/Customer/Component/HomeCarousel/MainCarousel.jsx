import { memo } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MainCarousel = () => {
  const navigate = useNavigate();

  const items = mainCarouselData.map((item, index) => (
    <motion.div
      key={index}
      className="flex flex-col-reverse md:flex-row items-center justify-between w-full min-h-[350px] md:h-[450px] lg:h-[500px] bg-white p-6 rounded-2xl shadow-md gap-6 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* --- Left Side (Text) --- */}
      <motion.div
        className="w-full md:w-1/2 space-y-4 text-center md:text-left md:-translate-y-10 "
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl md:text-4xl font-bold text-gray-800">
          {item.title}
        </h2>
        <p className="text-gray-600 text-base md:text-xl leading-relaxed">
          {item.description}
        </p>

        <motion.button
          onClick={() => navigate(item.path)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md shadow-md lg:mt-15 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.buttonText}
        </motion.button>
      </motion.div>


      {/* --- Right Side (Image) --- */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.03 }}
      >
        <img
          className="w-full max-w-[550px] h-[300px] md:h-[350px] object-cover rounded-2xl"
          src={item.image}
          alt={item.title}
        />
      </motion.div>
    </motion.div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      infinite
      disableButtonsControls
      autoPlayInterval={3000}
    />
  );
};

export default memo(MainCarousel);

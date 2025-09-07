import { memo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const MainCarouselNew = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample images for Sri Lankan handicrafts - replace with your actual images
    const slides = [
        {
            id: 1,

            image: "https://miro.medium.com/1*zjRGnf3HIvJZsosf4R6mpw.jpeg",
            title: "Traditional Pottery",
            subtitle: "Handcrafted Clay Vessels",
            description: "Authentic Sri Lankan pottery made by skilled artisans"
        },
        {
            id: 2,
            image: "https://mounthavana.com/wp-content/uploads/2024/05/03.06.jpg",
            title: "Wooden Sculptures",
            subtitle: "Carved with Passion",
            description: "Intricate wood carvings showcasing Sri Lankan heritage"
        },
        {
            id: 3,
            image: "https://akira.lk/wp-content/uploads/2024/07/Embrace-the-Heritage-of-Batik-with-Akira-The-History-and-Cultural-Significance-of-Batik.png",
            title: "Handwoven Textiles",
            subtitle: "Traditional Patterns",
            description: "Beautiful fabrics woven using ancient techniques"
        },
        {
            id: 4,
            image: "https://media.timeout.com/images/101852779/750/562/image.jpg",
            title: "Metal Crafts",
            subtitle: "Artisan Metalwork",
            description: "Exquisite metal crafts reflecting cultural traditions"
        }
    ];


    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };


    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/wood/decor/boxes");
    };
    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900 rounded-2xl shadow-2xl">
            {/* Main Carousel Container */}
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="relative flex-shrink-0 w-full h-full"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover' }}
                        >
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-black/30 backdrop-blur-xs"
                                style={{
                                    backgroundImage: `url('https://your-image-link-here.jpg')`
                                }}
                            ></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
                            <div className="max-w-2xl text-white">
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    From Earth to Art,
                                </h1>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    From Hand to <span style={{ color: 'rgb(238,113,89)' }}>Heart</span>
                                </h2>
                                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
                                    {slide.description}
                                </p>
                                <button
                                    className="cursor-pointer text-white font-semibold py-3 px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    style={{ backgroundColor: "rgb(238,113,89)" }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(220,100,75)")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(238,113,89)")}
                                    onClick={handleClick}
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'scale-110'
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        style={index === currentSlide ? { backgroundColor: 'rgb(238,113,89)' } : {}}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>


        </div>
    );
};

export default memo(MainCarouselNew);
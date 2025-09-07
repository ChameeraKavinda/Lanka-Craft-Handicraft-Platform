import { memo, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import Button from '@mui/material/Button'; 
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const HomeSectionCaroucel = ({data,sectionName}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const responsive = {
        0: { items: 1.5 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const slidePrev = () => carouselRef.current.slidePrev();
    const slideNext = () => carouselRef.current.slideNext();
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

const items = data.slice(0, 10).map((item, index) => (
  <HomeSectionCard key={index} product={item} />
));

    return (
        <div className="px-4 lg:px-8">
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center'>{sectionName}</h2>
            <div className="relative p-5 bg-white rounded shadow-lg">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    disableDotsControls
                    
                    responsive={responsive}
                    onSlideChange={syncActiveIndex}
                    activeIndex={activeIndex}
                />

                <Button
                    variant="contained"
                    onClick={slideNext}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0rem",
                        transform: "translate(50%, -50%)",
                        zIndex: 40,
                        backgroundColor: "white",
                        minWidth: "40px",
                        width: "40px",
                        height: "60px",
                        "&:hover": {
                            backgroundColor: "RGB(206 134 39)",
                        },
                    }}
                    aria-label="next"
                >
                    <KeyboardArrowRightIcon sx={{ color: "black" }} />
                </Button>

                <Button
                    variant="contained"
                    onClick={slidePrev}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0rem",
                        transform: "translate(50%, -50%)",
                        zIndex: 40,
                        backgroundColor: "white",
                        minWidth: "40px",
                        width: "40px",
                        height: "60px",
                        "&:hover": {
                            backgroundColor: "RGB(206 134 39)",
                        },
                    }}
                    aria-label="prev"
                >
                    <KeyboardArrowLeftIcon sx={{ color: "black" }} />
                </Button>
            </div>
        </div>
    );
};

export default memo(HomeSectionCaroucel);

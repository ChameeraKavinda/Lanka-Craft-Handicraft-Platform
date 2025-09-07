import { useState } from 'react';
import MainCarousel from '../../HomeCarousel/MainCarousel';
import HomeSectionCaroucel from '../../HomeSectionCaroucel/HomeSectionCaroucel';
import { dummyData } from '../../../../Data/DummyData';
import ArtisanRegisterCarousel from '../../HomeCarousel/ArtisanRegisterCarousel';
import Section2 from '../../HomeCarousel/Section2';
import MainCarouselNew from '../../HomeCarousel/MainCarouselNew';
import Category from '../../HomeCarousel/Category';
import Whatsapp from '../../HomeCarousel/Whatsapp';
import FeedBackForm from '../../HomeCarousel/FeedBackForm';


function HomePage() {


  return (

    <div style={{ backgroundColor: "rgb(249,228,212)" }}>

      <Whatsapp />
      <FeedBackForm/>
      <div className='mt-30'>
        <MainCarouselNew />
      </div>

      <div className='mt-30'>
        <Category />
      </div>
      <div className='mt-30'>
        <Section2 />
      </div>

      <div className='mt-30'>
        <ArtisanRegisterCarousel />
      </div>



      <div className='space-y-10 py-20 flex-col justify-center'>
        <HomeSectionCaroucel data={dummyData} sectionName={"Shop By Items"} />
        {/* <HomeSectionCaroucel data={dummyData} sectionName={"Brazers"}/>
       <HomeSectionCaroucel data={dummyData} sectionName={"Wall Art"}/> */}

      </div>

      <div className='mt-30'>
        <MainCarousel />
      </div>
    </div>

  );
}

export default HomePage;

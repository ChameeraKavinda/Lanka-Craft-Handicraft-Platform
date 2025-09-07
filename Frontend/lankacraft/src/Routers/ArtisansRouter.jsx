import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Artisans from '../Artisan/Components/Artisans';

const ArtisansRouter = () => {
  return (
    <div className="ArtisansRouter">
      <Routes>
        <Route path='/' element={<Artisans/>}></Route>
      </Routes>
    </div>
  );
};

export default memo(ArtisansRouter);
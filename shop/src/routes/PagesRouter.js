import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PageMain from '../pages/PageMain';
import PageProducts from '../pages/PageProducts';
import PageBasket from '../pages/PageBasket';
import PageProduct from '../pages/PageProduct';

export default function PagesRouter() {
  return (
    <Routes>
        <Route path="/" element={<PageMain/>} />
        <Route path="/products/:count" element={<PageProducts/>}/>
        <Route path="/product/:id" element={<PageProduct/>}/>
        <Route path="/basket" element={<PageBasket/>} />
    </Routes>
  )
}

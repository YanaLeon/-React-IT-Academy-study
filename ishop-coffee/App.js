import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store';

let storeArray = [ 
  {name:'Name', foto: "Foto", cost: 'Price', url: 'URL', country: "Country", id: 1}
];
let productsArray = require('./products.json');

ReactDOM.render(
    <Store store={storeArray} products={productsArray}/>,
  document.getElementById('container') 
);

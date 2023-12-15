import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { productsLoad } from "../redux/productsLoad.js";
import { NavLink } from 'react-router-dom';
import Product from './Product';
import Filter from './Filter.js';
import Modal from './Modal.js';

const Products = ({count}) => {

  const products = useSelector( state => state.products );
  const dispatch = useDispatch();
  

  useEffect(() => {
      dispatch( productsLoad );
  }, []);

  let productsJSX = [];
  let arrayId = [];
  
  if(products.products) {
    count = count*10;
    for (let i = count; arrayId.length < 10; i--) {
        arrayId.push(i);
    }
    products.products.filter((element, index) => {
        if(arrayId.includes(index+1)) {
            return productsJSX.push(<Product key = {element.id}
                                      info = {element} />);
        }
    })
};

let linksJSX = [];

function getLinkClass(obj) {
    let className="PageLink";
    if ( obj.isActive ){
      className="ActivePageLink";
    }
    return className;
}

if(products.products) {
    let countLinks = (products.products.length/10);
    let countLinksInteger;
    if(!Number.isInteger(countLinks)) {
        countLinksInteger = Math.trunc(countLinks) 
    } else {
        countLinksInteger = countLinks
    }
    for (let i = 1; i < countLinksInteger+1; i++) {
        linksJSX.push(<span key={i}><NavLink to={"/products/:"+i} className={getLinkClass}>{i}</NavLink></span>);
    }
    if(countLinks % 1) {
        countLinksInteger = countLinksInteger+1;
        linksJSX.push(<span key={countLinksInteger}><NavLink to={"/products/:"+countLinksInteger} className={getLinkClass}>{countLinksInteger}</NavLink></span>);
    }
}

  return (
    <div>
        <Filter/>
        <div className="wrapper-main">
            {productsJSX?productsJSX:"загрузка"}
        </div>
        {linksJSX}
    </div>
  )
}

export default React.memo( Products );
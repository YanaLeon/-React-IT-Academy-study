import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setProduct, add } from "../redux/basketSlice.js";

const Product = ({info}) => {

  const basket = useSelector( state => state.basket );
  const dispatch = useDispatch();
  const addBasket = useSelector( state => state.basket.addBasket );
  

  function addProductBasket () {
    dispatch( setProduct ({id: info.id, name: info.name, cost: info.cost, img: info.img, quantity: info.quantity}) );
    dispatch( add (true) );
  }

  return (
    // <NavLink to={"/product/:"+info.id}>
      <div className="Product">
        <img src = {"/image/" + info.img}/>
        <p className="name">{info.name}</p>
        <p className="description">{info.shortDescription}</p>
        <p className="cost">{info.cost}&euro;</p>
        {(info.quantity > 0)?<input type="button" className="add-to-cart" defaultValue={"+"} onClick={addProductBasket}/>:<p>Not available</p> }
        </div>
    // </NavLink>
  )
}

export default React.memo(Product);

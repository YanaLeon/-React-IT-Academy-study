import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

export const PagesLinks = () => {

    const number = useSelector( state => state.number );
    const basket = useSelector( state => state.basket.basket );
          
    function getLinkClass(obj) {
      let className="PageLink";
      if ( obj.isActive ){
        className="ActivePageLink";
      }
      return className;
    }
    
    // dispatch( getLink(10) ); переходим на main или about us меняем state на 10, чтобы начинать всегда с первого списка
   
    return (
      <div className='wrapper-link-logo'>
        <NavLink to="/" end className='logo-a'>
            <img src='/image/logo.png' className='logo'/>
        </NavLink>
        <div className='nav'>
            <NavLink to="/" end    className={getLinkClass}>Main</NavLink>
            <NavLink to={"/products/:"+number.number} className={getLinkClass}>Products</NavLink>
            <NavLink to="/basket" className={getLinkClass}>{basket.length > 0?"Basket"+basket.length:"Basket"}</NavLink>
        </div>
      </div>
    );

};
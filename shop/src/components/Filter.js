import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { filterStockAction, filterCategoryAction, setData, filterPriceAction } from "../redux/productsSlice.js";

import { getLink } from "../redux/linkSlice.js";
import { useNavigate } from "react-router-dom";

import './Filter.css';

export default function Filter() {

    const products = useSelector( state => state.products.products );
    const stock = useSelector( state => state.products.inStock);
    const category = useSelector( state => state.products.category);
    const copy= useSelector( state => state.products.copy);
    const price = useSelector( state => state.products.price);

    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(() => {
       if(products) {
        let newData = [...copy];
        
        if(stock) {
            newData = newData.filter(client => {
                return client.quantity > 0;
        })
        dispatch( getLink (1) );
        navigate("/products/:1");
       }

       if(category !== "All") {
           newData = newData.filter(client => {
               return client.category === category;
           });
           dispatch( getLink (1) );
           navigate("/products/:1");
       }

       if(price === "ascending") {
        newData = newData.sort((a, b) => {
            return a.cost - b.cost
        })
        dispatch( getLink (1) );
        navigate("/products/:1");
       }

       if(price === "descending") {
        newData = newData.sort((a, b) => {
            return b.cost - a.cost
        })
        dispatch( getLink (1) );
        navigate("/products/:1");
       }
        dispatch( setData (newData) );
       }
    }, [stock, category, price]);

    function filterStock (eo) {
        dispatch( filterStockAction(eo.target.checked) );
    };

    function filterCategory (eo) {
       dispatch( filterCategoryAction(eo.target.value) );
    };

    function filterPrice (eo) {
        dispatch( filterPriceAction(eo.target.value) );
     };

  return (
    <div className="filter">
        <span>See only:</span>
        <input type='checkbox' className = "custom-checkbox" id="stock" checked = {stock} onChange={filterStock}/>
        <label htmlFor="stock">In stock</label>
        <label htmlFor="category">Category:
            <select id="category" className = "custom-select" onChange={filterCategory}>
              <option value="All">All</option>
              <option value="sofa">Sofa</option>
              <option value="lamp">Lamp</option>
              <option value="armchairs">Armchairs</option>
              <option value="bed">Bed</option>
              <option value="vases">Vases</option>
              <option value="cabinets">Cabinets</option>
              <option value="dinnerware">Dinnerware</option>
            </select>
        </label>
        <label htmlFor="price">Price:
            <select id="price" className = "custom-select" onChange={filterPrice}>
                <option value="Not selected">Not selected</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </label>
    </div>
  )
}

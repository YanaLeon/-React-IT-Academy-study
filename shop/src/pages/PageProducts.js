import React, {useEffect, useRef} from 'react';

import {useParams} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getLink } from "../redux/linkSlice.js";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Products from '../components/Products';
import Modal from '../components/Modal';

import $ from 'jquery'; 

export default function PageProducts() {

    let divScroll = useRef(null);

    const params = useParams();
    const count = params.count;
    let number = Number(count.slice(1));
    
    const basket = useSelector( state => state.basket );
    const dispatch = useDispatch();
    const loaded = useSelector( state => state.basket.loaded );
    const addBasket = useSelector( state => state.basket.addBasket );

    useEffect(() => {
        divScroll.current.scrollIntoView({ block: "start", behavior: "smooth" });
        dispatch( getLink(number) );
    }, [number]);

console.log("render", addBasket)
  return (
    <main ref={divScroll}>
        <div>PageProducts</div>
        <Products count = {number}/>
        {addBasket?<Modal/>:null}
    </main>
  )
}

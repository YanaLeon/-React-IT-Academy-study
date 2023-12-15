import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { quantityAdd, quantityDelete } from "../redux/basketSlice.js";
import { getProduct } from "../redux/basketSlice.js";

import $ from 'jquery';

export default function Basket() {

    const basket = useSelector( state => state.basket.basket );
    const quantityOrder = useSelector( state => state.basket.quantityOrder );
    const dispatch = useDispatch();

    
    
// function a () {
//     let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
//     let basketName = 'LEONOVICH_SHOP_BASKET';
// 
//     function restoreInfo() {
//         $.ajax({
//             url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
//             data : { f : 'READ', n : basketName },
//             success : readReady, error : errorHandler
//         });
//     }
//     restoreInfo();
// 
//     function readReady(callresult) {
//         console.log(callresult)
//         if ( callresult.error != undefined ) {
//             console.log(callresult.error);
//         } else if ( callresult.result != "" ) {
//             let data = JSON.parse(callresult.result);
//             dispatch( getProduct (data) );
//             // console.log(info);
//         }
//     }
//     function errorHandler(jqXHR,statusStr,errorStr) {
//         console.log(errorStr);
//     }
// }


let basketJSX;
//     console.log(basket)
//     if(basket) {
//         basketJSX = basket.map((element, index) => {
//             return (
//                 <div key={element.id}>
//                     <img src = {"/image/" + element.img}/>
//                     <p className="name">{element.name}</p>
//                     <p className="cost">{quantityOrder[index].cost}&euro;</p>
//                     <input type="button" className="" defaultValue={"+"} onClick={(eo) => addProduct(element.id)} /*disabled={quantityOrder[index].quantity < element.quantity?false:true}*//>
//                     {quantityOrder[index].id === element.id?<span>{quantityOrder[index].quantity}</span>:"ошибка"}
//                     <input type="button" className="" defaultValue={"-"} onClick={(eo) => deleteProduct(element.id)} disabled={quantityOrder[index].quantity > 0?false:true}/>
//                     <input type="button" className="" defaultValue={"Delete"}/>
//                 </div>
//             )
//         })
//     }
// 
//     console.log(basketJSX, basket.basket)

    function addProduct (id) {
        console.log(id)
        dispatch( quantityAdd (id) );
    }
    
    function deleteProduct (id) {
        dispatch( quantityDelete (id) );
    };

  return (
    <>
    <div>Basket</div>
    {(basket)?"Корзина пуста":basketJSX}
    <input type="button" className="" defaultValue={"Checkout"}/>
    </>
  )
}

import { setProduct } from "./basketSlice.js";

import $ from 'jquery'; 

export function basketUpdate(dispatch) {
    
    let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    let basketName = 'LEONOVICH_SHOP_BASKET';
    let updatePassword;
    
    function send () {
        updatePassword = Math.random();
        $.ajax({
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : basketName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        });
    }
    send()
    
    function lockGetReady(callresult) {
        if ( callresult.error != undefined )
             console.log(callresult.error);
        else {
            $.ajax({
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : basketName,
                v : JSON.stringify(basket), p : updatePassword },
                success : updateReady, error : errorHandler
            });
        }
    }
    
    function updateReady(callresult) {
        if ( callresult.error != undefined ) {
            console.log(callresult.error);
        }
    }
    
    function errorHandler(jqXHR,statusStr,errorStr) {
        console.log(errorStr);
    }
};


let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';
/*
Como acá vamos a trabajar con callbacks no usaremos fetchs, ya que esto se implementó en ecmascript6.
En otras palabras, trabajaremos a la antigüa.
*/

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);// El valor 'true' es activar el asinconismo dentro de XMLHttpRequest.
    xhttp.onreadystatechange = function (event){
        if(xhttp.readyState === 4){ // El 4 hace referencia a un listado de estado de las peticiones (documentación en: https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp)
            if(xhttp.status === 200){ // El 200 hace referencia a que la petición fué exitosa.
                callback(null,JSON.parse(xhttp.responseText)); //El JSON hace que se devuelva en objeto, y no en texto plano.
            }else {
                const error = new Error('Error ' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

fetchData(API, function(error1, data1){
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function (error2,data2){
        if(error2) return console.error(error2);
        fetchData(data2.origin.url, function (error3,data3){
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    })
})
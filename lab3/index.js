let container = document.querySelector('.container');
let text = document.querySelector('#text');

function parseQuote(text){
    console.log(text);
}
function updateContent(){
    // fetch('https://api.forismatic.com/api/1.0/',{
    //     method:'POST',
    //     mode: 'no-cors',
    //     headers: {
    //         'Access-Control-Allow-Origin':'*',
    //         'Content-Type': 'text/html'
    //     },
    //     body:{
    //         method: 'getQuote'
    //     }
    // })
    // .then((res)=>{
    //     console.log(res);
    // });
    fetch("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote",{
        method:'POST',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((res)=>{
        console.log(res);
    });
}

document.createElement('canvas')
document.addEventListener("DOMContentLoaded", function(){
    updateContent();
    // setInterval(updateContent, 1000);
});
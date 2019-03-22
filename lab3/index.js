var text, img;


function updateView() {
    if (text && img && img.loaded) {
        ctx.drawImage(img, 0, 0);
        var lines = splitText(text);
        if (lines > 5) {
            text = img = null;
            return;
        }
        lines.map((line, i) => {
            ctx.fillText(line, 10, 150 + 27 * (i + 1), 510);
        });
    }
}


function parseQuote(quote) {
    text = quote.quoteText;
    updateView();
}

function updateContent() {
    text = null
    img = null;
    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote',
        dataType: 'jsonp'
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://source.unsplash.com/collection/1127163/550x400');
    xhr.send();
    xhr.onload = function (data) {
        img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.srcElement.responseURL;
        img.onload = function () {
            img.loaded = true;
            updateView();
        }
    };
}

function splitText(text) {
    var txt = text.split(' ');
    var currWidth = 0;
    var result = [''];
    var iter = 0;
    txt.map(word => {
        if (currWidth + ctx.measureText(word).width < 500) {
            currWidth += ctx.measureText(word).width;
            result[iter] += word + ' ';
        } else {
            ++iter;
            result[iter] = word + ' ';
            currWidth = ctx.measureText(word).width;
        }
    });
    return result;
}

//CSS
var stylesheet = document.createElement('style');
stylesheet.innerHTML = 
`body{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#text{
    display: block;
    border: 2px solid #72E4CD;
    text-align: center;
    font-size: 25px;
    margin-right: 1rem;
}

#btn{
    cursor: pointer;
    border: 2px solid #72E4CD;
    padding:  1rem 2rem;
} 

#btn:-webkit-any-link{
    color: #000;
    text-decoration:none;
}
`;
document.body.appendChild(stylesheet);

//HTML
var canvas = document.createElement('canvas');
canvas.id = 'text';
canvas.width = 550;
canvas.height = 400;
document.body.appendChild(canvas);

var button = document.createElement('a');
button.id = 'btn';
button.innerHTML = 'save';
document.body.appendChild(button);


button.addEventListener('click', function () {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
    button.download = dataURL;
});

ctx = canvas.getContext('2d');
ctx.font = "26px serif";

updateContent()
setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateContent();
}, 5000)
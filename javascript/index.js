var btn = document.getElementById('btn');
var input = document.getElementById('url');
var qrcodeBox = document.getElementById('qrcode');



function handler(evnt, url) {
    generator(url || input.value);
}

function debounce(fn, wait) {
    var timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}


function generator(url) {
    qrcodeBox.innerHTML = '';

    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 148,
        height: 148,
        colorDark: "#000",
        colorLight: "#efefef",
        correctLevel: QRCode.CorrectLevel.H
    });
}




document.addEventListener('DOMContentLoaded', function () {
    input && (input.value = location.href);
    handler(null, location.href);

    btn && btn.addEventListener('click', function () {
        if (input.value.trim() === '') {
            input.value = '';
            return;
        }
        generator(input.value);
    }, false);

    input && input.addEventListener('keydown', debounce(handler, 500));
    chrome && chrome.tabs && chrome.tabs.getSelected(null, function (tab) {
        setTimeout(function () {
            generator(tab.url);
        }, 0);
    });
    
});
window.addEventListener('pageshow', function(event) {
    console.log('after , pageshow :',event);
});